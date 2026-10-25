// Center-crops an image file to a square and scales it down, returning a JPEG blob.
// Keeps uploads small no matter how big the original photo is.
const resizeImage = async (file, size = 400) => {
  const bitmap = await createImageBitmap(file);

  const side = Math.min(bitmap.width, bitmap.height);
  const output = Math.min(size, side);

  const canvas = document.createElement("canvas");
  canvas.width = output;
  canvas.height = output;

  const ctx = canvas.getContext("2d");
  // JPEG has no transparency, so give transparent PNGs a white background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, output, output);
  ctx.drawImage(
    bitmap,
    (bitmap.width - side) / 2,
    (bitmap.height - side) / 2,
    side,
    side,
    0,
    0,
    output,
    output
  );
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
