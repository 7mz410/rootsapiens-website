/** Image registry. All PNG/JPG/WebP files in /assets are bundled (inlined as data URIs in the single-file build). */
const urls = import.meta.glob('../../assets/*.{png,jpg,webp}', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;

export type Img = HTMLImageElement | HTMLCanvasElement;

/** Images for rooms after the opening farm. loadAll() starts the game without them and fetches them in the background. */
const DEFERRED = /^(church_|barn_|village_|north_path|priest_|closeup_(annunciation|curtain|madonna|st_george))/;

export class Assets {
  private images = new Map<string, Img>();
  private missingLogged = new Set<string>();
  private placeholders = new WeakSet<Img>();
  /** Names still downloading in the background; get() draws them blank (not as MISSING) until they land. */
  private pending = new Set<string>();
  private blank: HTMLCanvasElement | null = null;
  /** Resolves once the background images have loaded too. */
  background: Promise<void> = Promise.resolve();

  isPlaceholder(img: Img): boolean { return this.placeholders.has(img); }
  readonly missing: string[] = [];

  names(): Set<string> {
    return new Set(Object.keys(urls).map((p) => p.split('/').pop() as string));
  }

  /** Loads the opening-room images (progress reported for those), then keeps loading the rest in the background. */
  async loadAll(onProgress?: (done: number, total: number) => void): Promise<void> {
    const entries = Object.entries(urls).map(([path, url]) => [path.split('/').pop() as string, url] as const);
    const now = entries.filter(([name]) => !DEFERRED.test(name));
    const later = entries.filter(([name]) => DEFERRED.test(name));
    for (const [name] of later) this.pending.add(name);
    let done = 0;
    await Promise.all(now.map(async ([name, url]) => {
      await this.loadOne(name, url);
      onProgress?.(++done, now.length);
    }));
    this.background = Promise.all(later.map(async ([name, url]) => {
      await this.loadOne(name, url);
      this.pending.delete(name);
    })).then(() => undefined);
  }

  private async loadOne(name: string, url: string): Promise<void> {
    const img = await Assets.loadImage(url);
    if (!img) { console.error(`[assets] failed to decode ${name}`); return; }
    this.images.set(name, img);
  }

  /**
   * img.decode() can reject for large images when many decode at once (memory pressure), even though the
   * image itself is fine. Fall back to the load event, then one fresh retry, before giving up.
   */
  private static async loadImage(url: string): Promise<HTMLImageElement | null> {
    for (let attempt = 0; attempt < 2; attempt++) {
      const img = new Image();
      img.decoding = 'async';
      const loaded = new Promise<boolean>((res) => { img.onload = () => res(true); img.onerror = () => res(false); });
      img.src = url;
      try { await img.decode(); return img; } catch { /* fall through */ }
      if ((img.complete && img.naturalWidth > 0) || (await loaded && img.naturalWidth > 0)) return img;
      await new Promise((r) => setTimeout(r, 200));
    }
    return null;
  }

  /** Returns the image, or a labelled magenta placeholder (logged once) if it is missing. */
  get(name: string, w = 256, h = 256): Img {
    const img = this.images.get(name);
    if (img) return img;
    if (this.pending.has(name)) {
      if (!this.blank) { this.blank = document.createElement('canvas'); this.blank.width = this.blank.height = 1; this.placeholders.add(this.blank); }
      return this.blank;
    }
    if (!this.missingLogged.has(name)) {
      this.missingLogged.add(name);
      this.missing.push(name);
      console.error(`[assets] MISSING ${name} - drawing placeholder`);
    }
    const key = `__missing__${name}_${w}x${h}`;
    let ph = this.images.get(key);
    if (!ph) {
      const c = document.createElement('canvas');
      c.width = w; c.height = h;
      const x = c.getContext('2d') as CanvasRenderingContext2D;
      for (let yy = 0; yy < h; yy += 32) for (let xx = 0; xx < w; xx += 32) {
        x.fillStyle = ((xx + yy) / 32) % 2 ? '#ff00ff' : '#300030';
        x.fillRect(xx, yy, 32, 32);
      }
      x.fillStyle = '#fff'; x.font = 'bold 18px sans-serif'; x.fillText(`MISSING ${name}`, 8, 28);
      ph = c;
      this.placeholders.add(ph);
      this.images.set(key, ph);
    }
    return ph;
  }

  has(name: string): boolean { return this.images.has(name); }

  /**
   * Colour-graded copy of an image, rendered once with a canvas filter and cached.
   * (A per-draw ctx.filter is far too slow for many sprites on software rasterisers.)
   */
  graded(name: string, filter: string, w = 256, h = 256): Img {
    const src = this.get(name, w, h);
    if (!filter || filter === 'none' || !(src instanceof HTMLImageElement)) return src;
    const key = `__graded__${name}__${filter}`;
    let g = this.images.get(key);
    if (!g) {
      const c = document.createElement('canvas');
      c.width = src.naturalWidth; c.height = src.naturalHeight;
      const x = c.getContext('2d') as CanvasRenderingContext2D;
      x.filter = filter;
      x.drawImage(src, 0, 0);
      g = c;
      this.images.set(key, g);
    }
    return g;
  }
}
