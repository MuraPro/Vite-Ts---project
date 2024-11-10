import { useContext } from "react";
import { CollapseContext } from "./CollapseContext";

interface CollapseResult {
  collapsed: boolean;
  toggleCollapse: () => void;
}

export function useCollapse(): CollapseResult {
  const context = useContext(CollapseContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  const { collapsed, toggleCollapse } = context;

  return { collapsed, toggleCollapse };
}
