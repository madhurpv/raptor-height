// src/components/ImagePicker.js
import React, { useRef } from 'react';
import * as exifr from 'exifr';

export default function ImagePicker({ onImage }) {
  const fileRef = useRef();

  const handleFile = async (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;

    // Convert image to base64
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const imgSrc = ev.target.result;
      let focal35 = null;

      try {
        const exif = await exifr.parse(f);
        if (exif) {
          // Direct 35mm equivalent if available
          if (exif.FocalLengthIn35mmFormat) {
            focal35 = parseFloat(exif.FocalLengthIn35mmFormat);
          } 
          // Otherwise approximate using crop factor if present
          else if (exif.FocalLength && exif.CropFactor) {
            focal35 = parseFloat(exif.FocalLength) * parseFloat(exif.CropFactor);
          }
        }
      } catch (err) {
        console.warn('EXIF read error:', err);
      }

      // Return both the image and focal length if found
      onImage(imgSrc, focal35);
    };
    reader.readAsDataURL(f);
  };

  return (
    <div style={{ marginBottom: 8 }}>
      <button className="btn" onClick={() => fileRef.current?.click()}>
        Upload photo
      </button>
      <input
        type="file"
        accept=""
        ref={fileRef}
        style={{ display: 'none' }}
        onChange={handleFile}
      />
    </div>
  );
}
