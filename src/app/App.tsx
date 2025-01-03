import { AppRouter } from "app/providers/router";
import { userActions } from "entities/User";
import { getUserInited } from "entities/User/model/selectors/getUserInited/getUserInited";
import { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { classNames } from "shared/lib/classNames/classNames";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { PageLoader } from "shared/ui/PageLoader/PageLoader";
import { Header } from "widgets/Header";
import cls from "./App.module.scss";
import "./styles/index.scss";

interface mainProps {
  className?: string;
}

const App = ({ className }: mainProps) => {
  const dispatch = useAppDispatch();
  const inited = useSelector(getUserInited);

  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

  return (
    <div className={classNames("app", {}, [className])}>
      <Suspense fallback={<PageLoader />}>
        <Header />
        <main className={cls.main}>{inited && <AppRouter />}</main>
      </Suspense>
    </div>
  );
};

export default App;
