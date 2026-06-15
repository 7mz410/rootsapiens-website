import fs from 'fs';
import path from 'path';

const dist = './dist';

// Clean up existing dist folder
if (fs.existsSync(dist)) {
  fs.rmSync(dist, { recursive: true, force: true });
}
fs.mkdirSync(dist);

// List of files and directories to copy to dist
const filesToCopy = [
  'index.html',
  'Rootsapiens.dc.html',
  'support.js',
  'image-slot.js',
  'images',
  'screenshots',
  'uploads',
  'CNAME'
];

filesToCopy.forEach(file => {
  if (fs.existsSync(file)) {
    const stats = fs.statSync(file);
    if (stats.isDirectory()) {
      fs.cpSync(file, path.join(dist, file), { recursive: true });
      console.log(`Copied directory: ${file} -> dist/${file}`);
    } else {
      fs.copyFileSync(file, path.join(dist, file));
      console.log(`Copied file: ${file} -> dist/${file}`);
    }
  } else {
    console.warn(`Warning: ${file} does not exist and was not copied.`);
  }
});

console.log('Build completed successfully.');
