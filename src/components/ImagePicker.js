import React, { useRef } from 'react';

export default function ImagePicker({ onImage }) {
  const fileRef = useRef();

  const handleFile = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      onImage(ev.target.result);
    };
    reader.readAsDataURL(f);
  };

  return (
    <div style={{ marginBottom: 8 }}>
      <button
        className="btn"
        onClick={() => fileRef.current && fileRef.current.click()}
      >
        Upload photo
      </button>
      <input
        type="file"
        accept="image/*"
        ref={fileRef}
        style={{ display: 'none' }}
        onChange={handleFile}
      />
    </div>
  );
}
