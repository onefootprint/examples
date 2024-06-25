import css from './components.module.css';

const Title = ({ children }: React.PropsWithChildren) => {
  return (
    <h1 className={css.title}>{children}</h1>
  );
}

export default Title