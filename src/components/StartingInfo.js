// src/components/Popup.js
import React, { useEffect } from "react";
import "./../styles/StartingInfo.css";

export default function StartingInfo({ onClose }) {

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div
        className="popup-card"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside card
      >
        <button className="popup-close" onClick={onClose}><b>✕</b></button>

        <div className="popup-scroll">
          <h2>Welcome to Bird Altitude Estimator!</h2>
            <p>This website helps you calculate the distance between your camera and the bird flying over you!</p>
            <p>How to use - </p>
            <ol>
                <li>Click on the 'Upload photo' button and select your image.</li>
                <li>Select the bird species present in the photo from the dropdown menu.</li>
                <li>Mark the bird's wingspan by clicking twice on the image - once at the start point and once at the end point.</li>
                <li>If the '35mm equivalent focal length' is not automatically filled in, set it to the 35mm equivalent focal length of your camera lens when the photo was taken.</li>
                <li>'Distance' displays the calculated distance of the bird from the camera, while 'Estimated uncertainity' indicates how much the actual distance may vary.</li>
            </ol>
            <p>This maths behind is based on simple trignometric calculations.</p>
            <p>Things to keep in mind - </p>
            <ul>
                <li>This tool calculates the distance between your camera and the bird, NOT the altitude of the bird. It will only represent altitude accurately if the bird is directly above the camera, as then the altitude roughly becomes the distance between the camera and the bird.</li>
                <li>Use images taken directly from the camera. DO NOT use cropped images, or images with modified aspect ratios.</li>
                <li>Use images where the bird has its wings COMPLETELY OPENED AND PERPENDICULAR TO THE CAMERA. This is so that we see the flat, completely opened wingspan. If the wings are hunched forward (as kites usually do) then it is of no use.</li>
                <li>The tool is only as accurate as the image and the data entered.</li>
                <li>The wingspan values of various birds are the mean wingspans. Some species have large wingspan variation, so the uncertainity in their estimated distance is larger.</li>
                <li>The wingspan lengths have been taken from various sources.</li>
                <li>The calculated wingspan values are only an estimate. Do not over-rely on them.</li>
                <li>The 'Estimated uncertainty' value is based on the variability of the wingspans of the bird species and the number of pixels selected for the wingspan measurement.</li>
                <li>The calculations can be improved in many ways, especially by adding more parameters. But such changes would only make the tool more precise, not necessarily more accurate.</li>
            </ul>
            <p>If you find any errors, orhave any feedback/suggestions, please feel free to contact me through <a href="https://docs.google.com/forms/d/e/1FAIpQLSebqvj4onLsT5J75vfA8aqOJvf9EmdOcX0XUWZkMnk6zczA8A/viewform?usp=dialog" target="_blank">https://docs.google.com/forms/d/e/1FAIpQLSebqvj4onLsT5J75vfA8aqOJvf9EmdOcX0XUWZkMnk6zczA8A/viewform?usp=dialog</a></p>
            <p>If you want to contribute, head over to <a href="https://github.com/madhurpv/raptor-height/tree/master">https://github.com/madhurpv/raptor-height/tree/master</a></p>
        </div>
      </div>
    </div>
  );
}