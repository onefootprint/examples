import css from './components.module.css';

const Header = ({ children }: React.PropsWithChildren) => (
  <header className={css.header}>
    {children}
  </header>
);

export default Header;
