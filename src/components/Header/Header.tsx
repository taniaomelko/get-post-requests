import './Header.scss';
import { Logo } from '../icons';

export const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <nav className="header__nav">
          <a href="/" aria-label="home">
            <Logo aria-hidden="true" />
          </a>

          <div className="header__buttons">
            <a href="/users" className="button button--cta">Users</a>
            <a href="/sign-up" className="button button--cta">Sign up</a>
          </div>
        </nav>
      </div>
    </header>
  );
}
