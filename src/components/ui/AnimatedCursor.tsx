"use client";

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Renders a custom animated cursor that follows the mouse and reacts to hoverable elements.
 */
export const AnimatedCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check for links, buttons, or elements with the data-cursor-hover attribute
      if (target.matches('a, button, [data-cursor-hover]')) {
        setIsHovering(true);
      }
    };
    
    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('a, button, [data-cursor-hover]')) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [cursorX, cursorY]);

  // Variants for the outer circle
  const variants = {
    default: {
      height: 32,
      width: 32,
      backgroundColor: "rgba(249, 115, 22, 0.1)",
      border: "1px solid #F97316",
    },
    hover: {
      height: 64,
      width: 64,
      backgroundColor: "rgba(249, 115, 22, 0.2)",
      border: "2px solid #F97316",
    }
  };
  
  // Variants for the inner dot
  const dotVariants = {
    default: {
      height: 8,
      width: 8,
      backgroundColor: "#F97316",
    },
    hover: {
       height: 0,
       width: 0,
       opacity: 0,
    }
  };

  // Only render on non-touch devices
  return (
    <div className="hidden md:block">
      <motion.div
        variants={variants}
        animate={isHovering ? "hover" : "default"}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-[9999]"
      />
      <motion.div
        variants={dotVariants}
        animate={isHovering ? "hover" : "default"}
        style={{
          x: cursorX,
          y: cursorY,
        }}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-[9999]"
      />
    </div>
  );
};
