import { useState } from 'react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { Tabs, TabItem } from './Tabs';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Tabs> = {
    title: 'shared/Tabs',
    component: Tabs,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {
        tabs: {
            control: 'object',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const tabsData: TabItem[] = [
    { value: 'tab1', content: 'Tab 1' },
    { value: 'tab2', content: 'Tab 2' },
    { value: 'tab3', content: 'Tab 3' },
];

const Template = (args: any) => {
    const [selectedTab, setSelectedTab] = useState(args.value);

    return (
        <Tabs
            {...args}
            value={selectedTab}
            onTabClick={(tab: TabItem) => setSelectedTab(tab.value)}
        />
    );
};

export const Light: Story = {
    render: Template,
    args: {
        value: 'tab1',
        tabs: tabsData,
        style: { position: 'absolute', top: '10px', left: '10px' },
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const Dark: Story = {
    render: Template,
    args: {
        value: 'tab1',
        tabs: tabsData,
        style: { position: 'absolute', top: '10px', left: '10px' },
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
