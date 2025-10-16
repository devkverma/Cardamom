import React, { useRef, useEffect } from "react";

const People = ({ mousePos, w, bg_color, isHidden }) => {
  const eyesRefs = useRef([]);
  const eyeOffset = useRef({ x: 0, y: 0 });
  const animationFrame = useRef(null);

  const updateEyes = () => {
    if (!eyesRefs.current[0]) return;

    let targetX = 0;
    let targetY = 0;

    const rect = eyesRefs.current[0].getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    if (!isHidden && mousePos.current.x >= centerX) {
      targetX = -4;
      targetY = 0;    
    } else {
      const dx = mousePos.current.x - centerX;
      const dy = mousePos.current.y - centerY;

      const angle = Math.atan2(dy, dx);
      targetX = Math.cos(angle) * 4;
      targetY = Math.sin(angle) * 4;
    }

    eyeOffset.current.x += (targetX - eyeOffset.current.x) * 0.2;
    eyeOffset.current.y += (targetY - eyeOffset.current.y) * 0.2;

    eyesRefs.current.forEach((eye) => {
      if (!eye) return;
      eye.style.transform = `translate(${eyeOffset.current.x}px, ${eyeOffset.current.y}px)`;
    });

    animationFrame.current = requestAnimationFrame(updateEyes);
  };

  useEffect(() => {
    animationFrame.current = requestAnimationFrame(updateEyes);
    return () => cancelAnimationFrame(animationFrame.current);
  }, [isHidden]); // re-run effect if isHidden changes

  return (
    <div>
      <div className={`face ${w} ${bg_color} shadow`}>
        <div className="upper-face">
          {[0, 1].map((i) => (
            <div className="eyes" key={i}>
              <div
                className="eyeballs"
                ref={(el) => (eyesRefs.current[i] = el)}
              >
                <div className="reflection"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default People;
