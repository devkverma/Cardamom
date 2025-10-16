import React, { useRef, useEffect, useState } from "react";
import People from "./People";

const Crowd = ({isHidden}) => {
  const mousePos = useRef({ x: 0, y: 0 });
  const [numPeople, setNumPeople] = useState(1); // default number

  // Track mouse position globally
  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Update number of people based on viewport width
  useEffect(() => {
    const updateNumPeople = () => {
      const width = window.innerWidth;
      const peopleCount = Math.max(1, Math.floor(width / 400));
      setNumPeople(peopleCount);
    };

    updateNumPeople();
    window.addEventListener("resize", updateNumPeople);
    return () => window.removeEventListener("resize", updateNumPeople);
  }, []);

  // Generate an array for mapping
  const peopleArray = Array.from({ length: numPeople });

  return (
    <div className="background">
      <div className="group">
        {peopleArray.map((_, i) => (
          <People
            key={i}
            mousePos={mousePos}
            isHidden={isHidden} 
            w={i % 3 === 1 ? "width-tall" : "width-normal"}
            bg_color={
              i % 3 === 0 ? "bg-yellow" : i % 3 === 1 ? "bg-black" : "bg-red"
            }
          />
        ))}
      </div>
      <div className="floor shadow"></div>
    </div>
  );
};

export default Crowd;
