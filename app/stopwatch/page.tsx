"use client"

import * as React from "react";
import { useState } from "react";

export default function App() {
  const formattedSeconds = (sec: number) =>
    Math.floor(sec / 60) + ':' + ('0' + sec % 60).slice(-2);

  const Stopwatch = ({ initialSeconds }: { initialSeconds: number }) => {
    const [incrementer, setIncrementer] = useState<NodeJS.Timeout | null>(null);
    const [laps, setLaps] = useState<number[]>([]);
    const [secondsElapsed, setSecondsElapsed] = useState(initialSeconds);
    const [lastClearedIncrementer, setLastClearedIncrementer] = useState<NodeJS.Timeout | null>(null);

    const handleStartClick = () => {
      const newIncrementer = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
      setIncrementer(newIncrementer);
    };

    const handleStopClick = () => {
      clearInterval(incrementer);
      setLastClearedIncrementer(incrementer);
    };

    const handleResetClick = () => {
      clearInterval(incrementer);
      setSecondsElapsed(initialSeconds);
      setLaps([]);
      setIncrementer(null);
      setLastClearedIncrementer(null);
    };

    const handleLapClick = () => {
      setLaps((prevLaps) => [...prevLaps, secondsElapsed]);
    };

    const handleDeleteClick = (index: number) => () => {
      setLaps((prevLaps) => prevLaps.filter((_, i) => i !== index));
    };

    return (
      <div className="stopwatch">
        <h1 className="stopwatch-timer">{formattedSeconds(secondsElapsed)}</h1>
        {(secondsElapsed === 0 || incrementer === lastClearedIncrementer
          ? <button type="button" className="start-btn" onClick={handleStartClick}>start</button>
          : <button type="button" className="stop-btn" onClick={handleStopClick}>stop</button>
        )}
        {secondsElapsed !== 0 && incrementer !== lastClearedIncrementer && (
          <button type="button" onClick={handleLapClick}>lap</button>
        )}
        {secondsElapsed !== 0 && incrementer === lastClearedIncrementer && (
          <button type="button" onClick={handleResetClick}>reset</button>
        )}
        <div className="stopwatch-laps">
          {laps && laps.map((lap, i) =>
            <Lap key={i} index={i + 1} lap={lap} onDelete={handleDeleteClick(i)} />)}
        </div>
      </div>
    );

  }
  const Lap = ({ index, lap, onDelete }: { index: number; lap: number; onDelete: () => void }) => (
    <div className="stopwatch-lap">
      <strong>{index}</strong>/ {formattedSeconds(lap)}{' '}
      <button onClick={onDelete}>X</button>
    </div>
  );

  return (
    <div className="App">
      <h1>Demo from Justin Longbottom</h1>
      <Stopwatch initialSeconds={0} />
    </div>
  );
}