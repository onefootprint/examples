import css from './components.module.css';

const Subtitle = ({ children }: React.PropsWithChildren) => {
  return (
    <h1 className={css.subtitle}>{children}</h1>
  );
}

export default Subtitle