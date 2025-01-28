import { createContext } from 'react';
import { Dispatch, SetStateAction } from 'react';

interface CollapseContextProps {
    collapsed: boolean;
    toggleCollapse: () => void;
    setCollapsed: Dispatch<SetStateAction<boolean>>;
}

export const CollapseContext = createContext<CollapseContextProps | undefined>(
    undefined,
);
