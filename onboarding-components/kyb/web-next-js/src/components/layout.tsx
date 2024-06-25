import css from './components.module.css';

const Layout = ({ children }: React.PropsWithChildren) => (
  <div className={css.layout}>
    {children}
  </div>
);

export default Layout;
