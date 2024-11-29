import { AppRouter } from "app/providers/router";
import { userActions } from "entities/User";
import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { classNames } from "shared/lib/classNames/classNames";
import { Header } from "widgets/Header";
import cls from "./App.module.scss";
import "./styles/index.scss";

interface mainProps {
  className?: string;
}

const App = ({ className }: mainProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

  return (
    <div className={classNames(`${cls.wrapper} app`, {}, [className || ""])}>
      <Suspense fallback="">
        <Header />
        <div className={cls.main}>
          <section className={cls.main__content}>
            <AppRouter />
          </section>
        </div>
      </Suspense>
    </div>
  );
};

export default App;
