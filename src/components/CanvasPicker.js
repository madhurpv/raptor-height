import React, { useRef, useState, useEffect } from 'react';
import { pixelsDistance } from '../utils/calc.js';

export default function CanvasPicker({ src, onPointsChange }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [img, setImg] = useState(null);

  const [points, setPoints] = useState([]);
  const [userScale, setUserScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState(null);
  const [draggingPointIndex, setDraggingPointIndex] = useState(null);
  const [hoverPointIndex, setHoverPointIndex] = useState(null); // 👈 new

  const baseScaleRef = useRef(1);

  useEffect(() => {
    function resizeCanvas() {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container || !img) return;
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      baseScaleRef.current = canvas.width / img.naturalWidth;

      if (points.length === 0) {
        const scaledW = img.naturalWidth * baseScaleRef.current * userScale;
        const scaledH = img.naturalHeight * baseScaleRef.current * userScale;
        const ox = (canvas.width - scaledW) / 2;
        const oy = (canvas.height - scaledH) / 2;
        setOffset({ x: ox, y: oy });
      }

      draw(canvas, img, points, userScale, offset);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [img]);

  useEffect(() => {
    if (!src) {
      setImg(null);
      setPoints([]);
      onPointsChange && onPointsChange([]);
      return;
    }
    const I = new Image();
    I.onload = () => {
      setImg(I);
      setUserScale(1);
      setPoints([]);
      onPointsChange && onPointsChange([]);
    };
    I.src = src;
  }, [src]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !img) return;
    draw(canvas, img, points, userScale, offset);
  }, [points, userScale, offset, img]);

  function draw(canvas, image, pts, scale, offsetVal) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const baseScale = baseScaleRef.current;
    const composite = baseScale * scale;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.setTransform(composite, 0, 0, composite, offsetVal.x, offsetVal.y);
    ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);
    ctx.restore();

    if (!pts || pts.length === 0) return;

    ctx.save();
    ctx.setTransform(composite, 0, 0, composite, offsetVal.x, offsetVal.y);

    if (pts.length === 2) {
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      ctx.lineTo(pts[1][0], pts[1][1]);
      ctx.strokeStyle = '#ff3b3b';
      ctx.lineWidth = 4 / composite;
      ctx.stroke();
    }

    for (let i = 0; i < pts.length; ++i) {
      const p = pts[i];
      ctx.beginPath();
      ctx.arc(p[0], p[1], 6 / composite, 0, Math.PI * 2);
      ctx.fillStyle = '#ff3b3b';
      ctx.fill();
      ctx.lineWidth = 1.5 / composite;
      ctx.strokeStyle = '#fff';
      ctx.stroke();
    }

    if (pts.length === 2) {
      const px = pixelsDistance(pts[0], pts[1]);
      const midX = (pts[0][0] + pts[1][0]) / 2;
      const midY = (pts[0][1] + pts[1][1]) / 2;
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.font = `${14 / composite}px Inter, sans-serif`;
      ctx.fillText(`${px.toFixed(1)} px`, midX + 10 / composite, midY - 10 / composite);
    }

    ctx.restore();
  }

  function clientToImageXY(clientX, clientY) {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const baseScale = baseScaleRef.current;
    const composite = baseScale * userScale;
    const cx = clientX - rect.left;
    const cy = clientY - rect.top;
    return [(cx - offset.x) / composite, (cy - offset.y) / composite];
  }

  function hitTestPoint(clientX, clientY) {
    if (!img) return -1;
    const [ix, iy] = clientToImageXY(clientX, clientY);
    const baseScale = baseScaleRef.current;
    const composite = baseScale * userScale;
    const hitRadius = 10 / composite;
    for (let i = 0; i < points.length; ++i) {
      const p = points[i];
      if (Math.hypot(p[0] - ix, p[1] - iy) <= hitRadius) return i;
    }
    return -1;
  }

  function handleWheel(e) {
    if (!img) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const zoomFactor = e.deltaY < 0 ? 1.12 : 0.88;
    const newScale = Math.min(Math.max(userScale * zoomFactor, 0.05), 40);
    const baseScale = baseScaleRef.current;
    const oldComposite = baseScale * userScale;
    const newComposite = baseScale * newScale;
    const ix = (mouseX - offset.x) / oldComposite;
    const iy = (mouseY - offset.y) / oldComposite;
    const offsetNewX = mouseX - newComposite * ix;
    const offsetNewY = mouseY - newComposite * iy;
    setUserScale(newScale);
    setOffset({ x: offsetNewX, y: offsetNewY });
  }

  function handleMouseDown(e) {
    if (!img) return;

    if (e.button === 1 || e.button === 2) {
      e.preventDefault();
      startPan(e);
      return;
    }

    if (e.button === 0) {
      const hit = hitTestPoint(e.clientX, e.clientY);
      if (hit >= 0) {
        setDraggingPointIndex(hit);
      } else if (points.length < 2) {
        const [ix, iy] = clientToImageXY(e.clientX, e.clientY);
        const newPts = [...points, [ix, iy]];
        setPoints(newPts);
        onPointsChange && onPointsChange(newPts);
      } else {
        startPan(e);
      }
    }
  }

  function startPan(e) {
    const rect = canvasRef.current.getBoundingClientRect();
    setIsPanning(true);
    setPanStart({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      origOffset: { ...offset },
    });
  }

  function handleMouseMove(e) {
    if (!img) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;

    // ✅ Check hover state when not dragging
    if (!isPanning && draggingPointIndex === null) {
      const hover = hitTestPoint(e.clientX, e.clientY);
      setHoverPointIndex(hover >= 0 ? hover : null);
    }

    if (isPanning && panStart) {
      const dx = cx - panStart.x;
      const dy = cy - panStart.y;
      setOffset({
        x: panStart.origOffset.x + dx,
        y: panStart.origOffset.y + dy,
      });
      return;
    }

    if (draggingPointIndex !== null) {
      const [ix, iy] = clientToImageXY(e.clientX, e.clientY);
      const newPts = points.map((p, i) => (i === draggingPointIndex ? [ix, iy] : p));
      setPoints(newPts);
      onPointsChange && onPointsChange(newPts);
    }
  }

  function handleMouseUp() {
    setIsPanning(false);
    setDraggingPointIndex(null);
    setPanStart(null);
  }

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '70vh',
        position: 'relative',
        borderRadius: 8,
        overflow: 'hidden',
      }}
    >
      {!img && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748b',
          }}
        >
          Upload image to begin
        </div>
      )}

      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          cursor:
            draggingPointIndex !== null
              ? 'grabbing'
              : hoverPointIndex !== null
              ? 'grab' // 👈 show grab when hovering over point
              : isPanning
              ? 'grabbing'
              : 'crosshair',
          background: '#f8fafc',
        }}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => {
          handleMouseUp();
          setHoverPointIndex(null);
        }}
        onContextMenu={(e) => e.preventDefault()}
      />
    </div>
  );
}
