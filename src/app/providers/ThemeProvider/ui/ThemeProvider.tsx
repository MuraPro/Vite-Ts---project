import { ReactNode, useEffect, useState } from 'react';
import { useJsonSettings, saveJsonSettings } from '@/entities/User'; // Получаем тему пользователя из бэкенда
import { Theme } from '@/shared/const/theme'; // Список доступных тем
import { PageLoader } from '@/shared/ui/PageLoader'; // Лоадер на случай задержки
import { ThemeContext } from '../../../../shared/lib/context/ThemeContext'; // Контекст для темы

interface ThemeProviderProps {
    initialTheme?: Theme;
    children: ReactNode;
}

// Функция для получения сохраненной темы из localStorage
const getStoredTheme = (): Theme | null => {
    return (localStorage.getItem('theme') as Theme) || null;
};

const ThemeProvider = ({ initialTheme, children }: ThemeProviderProps) => {
    const { theme: userTheme } = useJsonSettings(); // Получаем тему из бэкенда
    const [theme, setTheme] = useState<Theme | null>(null); // Состояние текущей темы

    // Устанавливаем тему только один раз при загрузке
    useEffect(() => {
        if (theme !== null) return; // Если тема уже установлена, не меняем

        const storedTheme = getStoredTheme(); // Получаем тему из localStorage

        if (userTheme) {
            setTheme(userTheme);
            localStorage.setItem('theme', userTheme); // Сохраняем в localStorage
        } else if (storedTheme) {
            setTheme(storedTheme);
        } else {
            setTheme(initialTheme || Theme.LIGHT); // Меняем на светлую по умолчанию
        }
    }, [userTheme, initialTheme, theme]);

    // Обновление темы и синхронизация с бэкендом + localStorage
    const updateTheme = (newTheme: Theme) => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme); // Сохранение в localStorage
        saveJsonSettings({ theme: newTheme }); // Сохранение на бэкенде
    };

    // Пока тема не определена, показываем лоадер
    if (!theme) {
        return <PageLoader />;
    }

    return (
        <ThemeContext.Provider value={{ theme, setTheme: updateTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
