import './Hero.scss';
import { Title } from '../Title/Title';

export const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero__content">
          <Title className="hero__title">
            Test assignment for front-end developer
          </Title>
          <div className="hero__description">
            What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.
          </div>
          <div className="hero__button-wrap">
            <a href="/sign-up" className="button button--cta">Sign up</a>
          </div>
        </div>
      </div>
    </section>
  );
}
