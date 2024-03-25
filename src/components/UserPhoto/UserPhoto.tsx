import { useState } from 'react';
import './UserPhoto.scss';
import { PhotoCoverIcon } from '../icons';

interface UserPhotoProps {
  src?: string; // src is optional, allowing for undefined values
  alt: string;
}

export const UserPhoto: React.FC<UserPhotoProps> = ({ src, alt }) => {
  const [error, setError] = useState<boolean>(false);

  const handleError = (): void => {
    setError(true);
  };

  return (
    <>
      {src && !error ? (
        <img src={src} alt={alt} loading="lazy" onError={handleError} />
      ) : (
        <PhotoCoverIcon />
      )}
    </>
  );
};
