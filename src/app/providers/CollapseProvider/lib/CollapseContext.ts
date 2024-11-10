import { createContext } from "react";

interface CollapseContextProps {
  collapsed: boolean;
  toggleCollapse: () => void;
}

export const CollapseContext = createContext<CollapseContextProps | undefined>(
  undefined,
);
