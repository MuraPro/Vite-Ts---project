import { StoryFn } from '@storybook/react';
import { createContext, useContext } from 'react';

// Создаем контекст для замены useParams
const MockedUseParamsContext = createContext<any | null>(null);

export const MockedParamsDecorator = (Story: StoryFn) => {
    // Мокаем useParams вручную
    const MockedUseParams = () => ({
        id: '1', // Мокаем параметр id
    });

    // Оборачиваем Story в провайдер с мокированным значением
    const Wrapper = () => {
        const useParamsMock = MockedUseParams;

        // Заменяем оригинальный useParams на наш мок
        const originalUseParams = useContext(MockedUseParamsContext);
        const useParams = originalUseParams || useParamsMock;

        return (
            <MockedUseParamsContext.Provider value={useParams}>
                <Story />
            </MockedUseParamsContext.Provider>
        );
    };

    return <Wrapper />;
};
