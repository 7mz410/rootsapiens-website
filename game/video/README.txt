Put game videos here (next to index.html, in a folder named "video").

Format: MP4 (H.264 video + AAC audio). Ship a .webm twin with the same name for browsers without H.264.
Keep 1920x1080 or 1280x720, 16:9. Other ratios are letterboxed.

Already wired (skipped automatically until the file exists):
  title_logo.mp4 SHIPPED: Omega Valley logo film behind the title screen (muted, holds its last frame;
              title_logo.webm twin). Without it the title painting is shown.
  intro.mp4   SHIPPED: prologue, the Ravens taking the professor up the mountain
              (Nadeem's clip 1 in full + clip 2 from 0:04.50, 25.7 s). intro.webm is the same clip
              for browsers without H.264. Plays before the North Pasture opening; click skips.
  outro.mp4   plays after the last village look, before the "End of vertical slice" card
  chapter1_end.mp4   plays when Joseph follows the hoofprints out of the pasture, before the North Path
  chapter2_end.mp4   plays when Joseph goes through the gap in the wall, before "End of Chapter 2"

Add more anywhere in a script:  { "do": "video", "file": "my_clip.mp4" }
Animated room plate (muted loop, same framing as the painted plate): add "video": "farm1_loop.mp4" to that room layer.
