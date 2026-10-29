// Crops an image file to a square and scales it down, returning a JPEG blob.
// Keeps uploads small no matter how big the original photo is.
// crop is { x, y, side } in the original image's pixels; without it the center square is used.
const resizeImage = async (file, size = 400, crop) => {
  const bitmap = await createImageBitmap(file);

  const side = crop ? crop.side : Math.min(bitmap.width, bitmap.height);
  const x = crop ? crop.x : (bitmap.width - side) / 2;
  const y = crop ? crop.y : (bitmap.height - side) / 2;
  const output = Math.round(Math.min(size, side));

  const canvas = document.createElement("canvas");
  canvas.width = output;
  canvas.height = output;

  const ctx = canvas.getContext("2d");
  // JPEG has no transparency, so give transparent PNGs a white background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, output, output);
  ctx.drawImage(bitmap, x, y, side, side, 0, 0, output, output);
  bitmap.close();

  return new Promise((resolve, reject) =>
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Could not process image"))),
      "image/jpeg",
      0.85
    )
  );
};

export default resizeImage;
