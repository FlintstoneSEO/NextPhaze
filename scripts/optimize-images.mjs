import sharp from 'sharp';

const assets = [
  ['Project Source/Images/Carrington Action Shot.png', 'public/images/carrington-action-hero.webp', 1600, 84],
  ['Project Source/Images/Carrington Action Shot2.PNG', 'public/images/carrington-wmu-proof.webp', 1200, 84],
  ['Project Source/Images/Carrington Action 5.png', 'public/images/carrington-mpif-proof.webp', 1200, 84],
  ['public/images/training-acceleration.png', 'public/images/training-acceleration.webp', 1600, 82],
  ['public/images/training-lane.png', 'public/images/training-lane.webp', 1600, 82],
  ['public/images/receiver-catch.png', 'public/images/receiver-catch.webp', 1400, 82],
  ['public/images/nextphaze-logo-transparent.png', 'public/images/nextphaze-logo-transparent.webp', 512, 90]
];

for (const [input, output, width, quality] of assets) {
  await sharp(input)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 5 })
    .toFile(output);
}
