import React, { useState, useEffect, useRef } from 'react';
import './TextTooltip.scss';

interface TextTooltipProps {
  fullText: string;
  href?: string; // Optional href for links
}

export const TextTooltip: React.FC<TextTooltipProps> = ({
  fullText,
  href
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [trimmedText, setTrimmedText] = useState<string>('');
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trimText = () => {
      const container = textContainerRef.current;
      if (!container) return;

      const containerWidth = container.offsetWidth;
      const averageCharWidth = 9; // Assume average character width is 9px
      const maxChars = Math.floor(containerWidth / averageCharWidth) - 3;

      // Check if the text needs to be trimmed
      if (fullText.length > maxChars) {
        setTrimmedText(`${fullText.substring(0, maxChars)}...`);
      } else {
        setTrimmedText(fullText);
      }
    };

    // Execute the function right away and also on resize/load events
    trimText();
    window.addEventListener('resize', trimText);
    window.addEventListener('load', trimText);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', trimText);
      window.removeEventListener('load', trimText);
    };
  }, [fullText]);

  return (
    <div 
      ref={textContainerRef} 
      className="text-tooltip" 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      {href ? (
        <a href={`mailto:${href}`}>{trimmedText}</a>
      ) : (
        <p>{trimmedText}</p>
      )}
      {isHovered && trimmedText !== fullText && (
        <div className="text-tooltip__full-text">{fullText}</div>
      )}
    </div>
  );
};
