import { useEffect, useState } from "react";
import "../styles/ResultAnimation.css";

function ResultAnimation({ onComplete }) {
  const [frame, setFrame] = useState(1);
  const [isVisible, setIsVisible] = useState(true);
  const totalFrames = 7;

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setFrame((prev) => {
        if (prev >= totalFrames) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            if (onComplete) onComplete(); // ✅ 애니메이션 끝났다고 알려줌
          }, 300);
          return prev;
        }
        return prev + 1;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [isVisible, onComplete]);

  return (
    <div
      className={`result-animation-container ${
        !isVisible ? "result-animation-hidden" : ""
      }`}
    >
      <div className="back-container">
        <img src="/images/반짝이.png" alt="sparkle-left" />
        <div className="circle"></div>
        <img src="/images/반짝이.png" alt="sparkle-right" />
      </div>

      <div className="ticketview">
        <h1>티켓을 발행하고 있어요!</h1>
        <img
          src={`/images/TicketAnimation/애니메이션${frame}.png`}
          alt={`frame-${frame}`}
          className="animation-frame"
        />
      </div>
    </div>
  );
}

export default ResultAnimation;
