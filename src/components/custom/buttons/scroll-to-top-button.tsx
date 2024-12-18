'use client';

import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { cn } from '@/lib/utils';

const ScrollToTopButton = () => {
  const [rightPosition, setRightPosition] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Progress bar state
  const [y, setY] = useState(0); // Storing current scroll bar position
  const [totalY, setTotalY] = useState<number>(0); // Storing total scrollable area

  // Calculate the circular path length for the SVG circle
  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  // Handle scroll progress and calculate total scrollable area
  useEffect(() => {
    const handleScroll = () => setY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    const element = document.documentElement;
    setTotalY(element.scrollHeight - window.innerHeight); // Calculate total scrollable area

    return () => window.removeEventListener('scroll', handleScroll);
  }, [y]);

  // Calculate the scroll progress
  const scrollProgress = useMemo(() => {
    const progress = (y / totalY) * 100; // Percentage of scroll
    return Math.min(progress, 100); // Ensure it doesn't exceed 100%
  }, [y, totalY]);

  // Calculate the stroke-dashoffset to create the animated progress effect
  const dashOffset = useMemo(() => {
    return circumference - (scrollProgress / 100) * circumference;
  }, [scrollProgress, circumference]);

  // Adjust the right position of the button dynamically based on window width
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth > 1200) {
        setRightPosition((windowWidth - 1200) / 2 + 40); // Center with some offset
      } else {
        setRightPosition(10); // Default right position for smaller screens
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial position on load

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (scrollProgress == 100) {
      setMounted(true);
    }

    if (mounted && scrollProgress < 100) {
      setTimeout(() => {
        setMounted(false);
      }, 100);
    }
  }, [mounted, scrollProgress]);

  const handleScrollTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <React.Fragment>
      {scrollProgress > 5 && (
        <div
          className={cn(
            'group fixed bottom-14 right-14 z-40 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-neutral-900 transition-all dark:bg-neutral-700',
          )}
          // style={{ right: `${rightPosition}px` }}
          onClick={handleScrollTop}
        >
          {/* SVG Circle for Progress Indicator */}
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            className="absolute"
          >
            <circle
              className="text-neutral-700 dark:text-neutral-700"
              stroke="currentColor"
              strokeWidth="10"
              fill="transparent"
              r={radius}
              cx="50"
              cy="50"
            />
            <circle
              className="text-[#212121] dark:text-neutral-900"
              stroke="currentColor"
              strokeWidth="10"
              fill="transparent"
              r={radius}
              cx="50"
              cy="50"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              style={{
                transition: 'stroke-dashoffset 0.3s ease',
                transform: 'rotate(-90deg)',
                transformOrigin: '50% 50%',
              }}
            />
          </svg>

          {/* Scroll-to-Top Button Icon */}
          {scrollProgress === 100 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }} // Start state for animation
              animate={{ opacity: 1, y: 0 }} // End state
              exit={{ opacity: 0, y: 20 }} // State when exiting (optional)
              transition={{
                duration: 0.6, // Duration in seconds
                ease: 'easeInOut', // Easing function
              }}
            >
              <div>
                <ArrowUp className="relative h-5 w-5 cursor-pointer text-neutral-300 transition-all hover:animate-pulse dark:text-neutral-300" />
              </div>
            </motion.div>
          ) : (
            <span className="text-xs font-bold text-neutral-300 transition-all dark:text-neutral-300">
              {scrollProgress.toFixed(0)}
            </span>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default React.memo(ScrollToTopButton);
