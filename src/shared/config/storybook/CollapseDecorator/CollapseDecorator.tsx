import { StoryFn, StoryContext } from '@storybook/react';
// eslint-disable-next-line mura-pro-plugin/layer-imports
import { CollapseProvider } from '@/app/providers/CollapseProvider';

export const CollapseDecorator = (StoryFn: StoryFn, context: StoryContext) => (
    <CollapseProvider>
        <StoryFn {...context.args} />
    </CollapseProvider>
);
