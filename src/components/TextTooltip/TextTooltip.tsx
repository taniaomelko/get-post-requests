import React, { useState, useEffect, useRef } from 'react';
import './TextTooltip.scss';

interface TextTooltipProps {
  fullText: string;
  href?: boolean; // Optional href for links
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

      // create temporary span for trimming text
      const span = document.createElement('span');
      span.style.visibility = 'hidden';
      span.style.position = 'absolute';
      span.style.whiteSpace = 'nowrap';
      document.body.appendChild(span);
      span.textContent = fullText;
  
      let maxChars = fullText.length;
      while (container.clientWidth < span.offsetWidth && maxChars > 0) {
        span.textContent = fullText.substring(0, maxChars);
        maxChars--;
      }

      const content = span.textContent;
      if (fullText.length > maxChars) {
        setTrimmedText(`${content.slice(0, -3)}...`);
      } else {
        setTrimmedText(content);
      }

      document.body.removeChild(span); // Cleanup
    };

    // Execute the function right away and also on resize/load events
    trimText();
    window.addEventListener('load', trimText);
    window.addEventListener('resize', trimText);

    // Cleanup function
    return () => {
      window.removeEventListener('load', trimText);
      window.removeEventListener('resize', trimText);
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
        <a href={`mailto:${fullText}`}>{trimmedText}</a>
      ) : (
        <p>{trimmedText}</p>
      )}
      {isHovered && trimmedText !== fullText && (
        <div className="text-tooltip__full-text">{fullText}</div>
      )}
    </div>
  );
};
