import { AppRouter } from "app/providers/router";
import { Suspense } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Header } from "widgets/Header";
import cls from "./App.module.scss";
import "./styles/index.scss";

interface mainProps {
  className?: string;
}

const App = ({ className }: mainProps) => {
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
