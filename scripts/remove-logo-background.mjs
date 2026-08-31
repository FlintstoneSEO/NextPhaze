import sharp from 'sharp';

const input = 'public/images/nextphaze-logo.png';
const output = 'public/images/nextphaze-logo-transparent.png';
const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const pixels = info.width * info.height;
const visited = new Uint8Array(pixels);
const queue = new Int32Array(pixels);
let head = 0;
let tail = 0;

const isBackgroundBlack = (index) => {
  const offset = index * info.channels;
  return data[offset] <= 8 && data[offset + 1] <= 8 && data[offset + 2] <= 8;
};

const add = (index) => {
  if (!visited[index] && isBackgroundBlack(index)) {
    visited[index] = 1;
    queue[tail++] = index;
  }
};

for (let x = 0; x < info.width; x++) {
  add(x);
  add((info.height - 1) * info.width + x);
}

for (let y = 1; y < info.height - 1; y++) {
  add(y * info.width);
  add(y * info.width + info.width - 1);
}

while (head < tail) {
  const index = queue[head++];
  const x = index % info.width;
  const y = Math.floor(index / info.width);
  const offset = index * info.channels;
  data[offset + 3] = 0;

  if (x > 0) add(index - 1);
  if (x < info.width - 1) add(index + 1);
  if (y > 0) add(index - info.width);
  if (y < info.height - 1) add(index + info.width);
}

await sharp(data, { raw: info }).png().toFile(output);
