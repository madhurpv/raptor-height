import React from 'react';

export default function Results({ distance, altitude, uncertaintyFraction }){
  return (
    <div className="panel right">
      <div className="header">Result</div>
      {!distance && <div className="hint">Select two points and provide species + focal length to compute.</div>}
      {distance && (
        <div>
          <div className="result">Distance (camera to bird): <strong>{distance.toFixed(2)} m</strong></div>
          <div className="result">Estimated altitude: <strong>{altitude.toFixed(2)} m</strong></div>
          {uncertaintyFraction!=null && (
            <div className="small">Estimated uncertainty: ±{(uncertaintyFraction*100).toFixed(1)}%</div>
          )}
        </div>
      )}
    </div>
  );
}
