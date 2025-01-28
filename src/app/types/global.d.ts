declare module '*.scss' {
    interface IClassNames {
        [className: string]: string;
    }
    const classnames: IClassNames;
    export = classnames;
}

declare module '*.svg' {
    import { FC, SVGProps } from 'react';
    const content: FC<SVGProps<SVGSVGElement>>;
    export default content;
}

declare const VITE_IS_DEV: boolean;
declare const VITE_API_URL: string;
declare const __PROJECT__: 'storybook' | 'frontend' | 'jest';

type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type CombinedStateEquivalent<T> = {
    [K in keyof T]: T[K] extends object ? CombinedStateEquivalent<T[K]> : T[K];
};

type OptionalRecord<K extends keyof any, T> = {
    [P in K]?: T;
};
