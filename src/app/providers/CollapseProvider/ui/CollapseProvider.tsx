import { FC, useMemo, useState, ReactNode } from "react";
import { CollapseContext } from "@/shared/lib/context/CollapseContext";

interface CollapseProviderProps {
  children: ReactNode;
}

const CollapseProvider: FC<CollapseProviderProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed((prev) => !prev);
  };

  const defaultProps = useMemo(
    () => ({
      collapsed: collapsed,
      toggleCollapse: toggleCollapse,
      setCollapsed: setCollapsed,
    }),
    [collapsed],
  );

  return (
    <CollapseContext.Provider value={defaultProps}>
      {children}
    </CollapseContext.Provider>
  );
};

export default CollapseProvider;
