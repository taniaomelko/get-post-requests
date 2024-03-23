import './Success.scss';
import { Title } from '../Title/Title';

export const Success = () => {  
  return (
    <div className="success">
      <Title className="success__title">
        User successfully registered
      </Title>

      <div className="success__img">
        <img src="./img/success-image.svg" alt="" />
      </div>
    </div>
  );
}
