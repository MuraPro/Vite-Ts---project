import classes from './App.module.scss';
import { Suspense } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { MainPageAsync } from './pages/MainPage/MainPage.async';
import { AboutPageAsync } from './pages/AboutPage/AboutPage.async';
import { useTheme } from './theme/useTheme';
import { classNames } from './helpers/classNames/classNames';

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className={classNames('theme', { hovered: true, selected: false }, [
        theme,
        classes.container,
      ])}
    >
      <h1 className={classes.title}>Hello World</h1>

      <button onClick={toggleTheme} type='button' className={classes.btn}>
        toggle
      </button>

      <Link className={classes.link} to={'/'}>
        Главная
      </Link>
      <Link className={classes.link} to={'/about'}>
        О сайте
      </Link>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path={'/'} element={<MainPageAsync />} />
          <Route path={'/about'} element={<AboutPageAsync />} />
        </Routes>
      </Suspense>
      <input type='text' className={classes.input} />
    </div>
  );
}

export default App;
