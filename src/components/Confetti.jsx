import confetti from 'canvas-confetti';
import { useEffect } from 'react';

function Confetti({ winner }) {
  const count = 200;
  const defaults = {};

  const blackColors = [
    '#000000',
    '#000000',
    '#1a1a1a',
    '#272727',
    '#d41717',
    '#00a35f',
    '#6a10d1',
  ];

  const whiteColors = [
    '#FFFFFF',
    '#FFFFFF',
    '#FFFFFF',
    '#e6e6e6',
    '#cccccc',
    '#b3b3b3',
    '#ffe681',
    '#5facff',
    '#ff7e79',
  ];

  if (winner === 'noir') {
    defaults.colors = blackColors;
  } else {
    defaults.colors = whiteColors;
  }

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
      origin: { x: Math.random(), y: 1 },
    });
  }

  useEffect(() => {
    let fireCount = 0;
    const totalFires = 3;
    const intervalTime = 1000;

    const intervalId = setInterval(() => {
      fireCount++;

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
      });
      fire(0.2, {
        spread: 60,
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      });

      if (fireCount >= totalFires) {
        // Stop the interval when the total number of fires is reached
        clearInterval(intervalId);
      }
    }, intervalTime);

    return () => clearInterval(intervalId);
  }, []);

  return null;
}

export default Confetti;
