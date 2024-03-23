import React, { ReactNode } from 'react';
import './Title.scss';

interface TitleProps {
  className: string;
  children: ReactNode;
}

export const Title: React.FC<TitleProps> = ({ className, children }) => {
  return (
    <h1 className={className}>
      {children}
    </h1>
  );
}
