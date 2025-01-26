import { useContext, Dispatch, SetStateAction } from "react";
import { CollapseContext } from "../../context/CollapseContext";

interface CollapseResult {
  collapsed: boolean;
  toggleCollapse: () => void;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
}

export function useCollapse(): CollapseResult {
  const context = useContext(CollapseContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  const { collapsed, toggleCollapse, setCollapsed } = context;

  return { collapsed, toggleCollapse, setCollapsed };
}
