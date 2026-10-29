import { useEffect, useRef, useState } from "react";

// Size of the square crop area on screen, in pixels
const VIEW = 256;
const MAX_ZOOM = 3;

// Keeps the image covering the whole crop area
const clampOffset = (offset, width, height) => ({
  x: Math.max(-(width - VIEW) / 2, Math.min((width - VIEW) / 2, offset.x)),
  y: Math.max(-(height - VIEW) / 2, Math.min((height - VIEW) / 2, offset.y)),
});

// Lets the user drag and zoom a picture inside a circle before uploading it.
// Calls onConfirm with { x, y, side }: the chosen square in the original image's pixels.
const ImageCropper = ({ file, onCancel, onConfirm, onError }) => {
  const [src, setSrc] = useState("");
  const [natural, setNatural] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragRef = useRef(null);
  const areaRef = useRef(null);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onErrorRef.current = onError;
  });

  // Load the picture first so we know its size before showing it
  useEffect(() => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      setNatural({ width: image.naturalWidth, height: image.naturalHeight });
      setSrc(url);
    };
    image.onerror = () => onErrorRef.current();
    image.src = url;
    return () => {
      image.onload = image.onerror = null;
      URL.revokeObjectURL(url);
    };
  }, [file]);

  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && onCancel();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onCancel]);

  // At zoom 1 the shorter side of the image fills the crop area
  const scale = natural ? (VIEW / Math.min(natural.width, natural.height)) * zoom : 1;
  const width = natural ? natural.width * scale : VIEW;
  const height = natural ? natural.height * scale : VIEW;

  const changeZoom = (value) => {
    const next = Math.max(1, Math.min(MAX_ZOOM, value));
    const ratio = next / zoom;
    setZoom(next);
    // Zoom around the center of the crop area
    setOffset((current) =>
      clampOffset({ x: current.x * ratio, y: current.y * ratio }, width * ratio, height * ratio)
    );
  };

  // Scrolling over the picture zooms it; needs a non-passive listener to stop the page scrolling
  useEffect(() => {
    const area = areaRef.current;
    if (!area) return;
    const handleWheel = (e) => {
      e.preventDefault();
      changeZoom(zoom - e.deltaY * 0.002);
    };
    area.addEventListener("wheel", handleWheel, { passive: false });
    return () => area.removeEventListener("wheel", handleWheel);
  });

  const handlePointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = { startX: e.clientX, startY: e.clientY, origin: offset };
  };

  const handlePointerMove = (e) => {
    const drag = dragRef.current;
    if (!drag) return;
    setOffset(
      clampOffset(
        { x: drag.origin.x + e.clientX - drag.startX, y: drag.origin.y + e.clientY - drag.startY },
        width,
        height
      )
    );
  };

  const handlePointerUp = () => {
    dragRef.current = null;
  };

  const handleConfirm = () => {
    const left = (VIEW - width) / 2 + offset.x;
    const top = (VIEW - height) / 2 + offset.y;
    onConfirm({ x: -left / scale, y: -top / scale, side: VIEW / scale });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="crop-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 dark:bg-slate-900"
      >
        <h2 id="crop-title" className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Crop Profile Image
        </h2>

        <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">
          Drag to reposition. Use the slider to zoom.
        </p>

        {/* Crop area */}
        <div
          ref={areaRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="relative mx-auto mt-6 overflow-hidden bg-slate-200 cursor-grab active:cursor-grabbing touch-none select-none dark:bg-slate-700"
          style={{ width: VIEW, height: VIEW }}
        >
          {src && (
            <img
              src={src}
              alt=""
              draggable={false}
              className="absolute max-w-none pointer-events-none"
              style={{
                width,
                height,
                left: (VIEW - width) / 2 + offset.x,
                top: (VIEW - height) / 2 + offset.y,
              }}
            />
          )}

          {/* Darkens everything outside the circle the profile shows */}
          <div className="absolute inset-0 rounded-full pointer-events-none shadow-[0_0_0_9999px_rgba(0,0,0,0.5)] ring-2 ring-white/80"></div>
        </div>

        {/* Zoom */}
        <div className="flex items-center gap-3 mt-6">
          <button
            type="button"
            onClick={() => changeZoom(zoom - 0.25)}
            aria-label="Zoom out"
            className="w-8 h-8 shrink-0 rounded-full border border-gray-300 text-lg leading-none hover:bg-gray-100 dark:border-slate-600 dark:text-gray-100 dark:hover:bg-slate-800"
          >
            −
          </button>

          <input
            type="range"
            min="1"
            max={MAX_ZOOM}
            step="0.01"
            value={zoom}
            onChange={(e) => changeZoom(Number(e.target.value))}
            aria-label="Zoom"
            className="w-full accent-teal-600"
          />

          <button
            type="button"
            onClick={() => changeZoom(zoom + 0.25)}
            aria-label="Zoom in"
            className="w-8 h-8 shrink-0 rounded-full border border-gray-300 text-lg leading-none hover:bg-gray-100 dark:border-slate-600 dark:text-gray-100 dark:hover:bg-slate-800"
          >
            +
          </button>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 dark:border-slate-600 dark:text-gray-100 dark:hover:bg-slate-800"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={!natural}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-60"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;
