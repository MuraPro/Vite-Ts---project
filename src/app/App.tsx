import { AppRouter } from "app/providers/router";
import { userActions } from "entities/User";
import { Suspense, useEffect } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Header } from "widgets/Header";
import cls from "./App.module.scss";
import "./styles/index.scss";

interface mainProps {
  className?: string;
}

const App = ({ className }: mainProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

  return (
    <div className={classNames(`${cls.wrapper} app`, {}, [className])}>
      <Suspense fallback="">
        <Header />
        <main className={cls.main}>
          <div className="_container">
            <AppRouter />
          </div>
        </main>
      </Suspense>
    </div>
  );
};

export default App;
