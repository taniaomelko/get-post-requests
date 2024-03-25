import './Card.scss';
import { TextTooltip } from '../TextTooltip/TextTooltip';
import { IUser } from '../../types/IUser';
import { UserPhoto } from '../UserPhoto/UserPhoto';

interface CardProps {
  user: IUser;
}

function formatPhoneNumber(phoneNumber: string): string {
  // Remove any non-digit characters from the phone number
  const digitsOnly = phoneNumber.replace(/\D/g, '');

  // Use regular expressions to extract the country code, area code, and local number
  const countryCode = digitsOnly.slice(0, 2);
  const areaCode = digitsOnly.slice(2, 5);
  const localNumber = digitsOnly.slice(5);

  // Format the phone number according to the desired pattern
  return `+${countryCode} (${areaCode}) ${localNumber.slice(0, 3)} ${localNumber.slice(3, 5)} ${localNumber.slice(5)}`;
}

export const Card: React.FC<CardProps> = ({ user }) => {
  const { photo, name, position, email, phone } = user;

  return (
    <div className="card">
      <div className="card__image">
        <UserPhoto src={photo} alt={name} />
      </div>

      <TextTooltip fullText={name} />

      <div className="card__info">
        <TextTooltip fullText={position} />
        <TextTooltip fullText={email} href={true} />
        <a href={`tel:${formatPhoneNumber(phone)}`}>{formatPhoneNumber(phone)}</a>
      </div>
    </div>
  );
};
