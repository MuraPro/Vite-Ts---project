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
    const { theme: userTheme } = useJsonSettings(); // saveJsonSettings — функция для сохранения данных пользователя
    const [theme, setTheme] = useState<Theme | null>(null); // Состояние текущей темы

    // Установка темы при загрузке
    useEffect(() => {
        const storedTheme = getStoredTheme(); // Получаем тему из localStorage

        if (userTheme) {
            // Если пользовательская тема доступна из бэкенда
            setTheme(userTheme);
            localStorage.setItem('theme', userTheme); // Сохраняем в localStorage
        } else if (storedTheme) {
            // Если тема есть в localStorage, но отсутствует у пользователя
            setTheme(storedTheme);
        } else {
            // Если ничего не найдено, используем initialTheme или темную тему по умолчанию
            setTheme(initialTheme || Theme.DARK);
        }
    }, [userTheme, initialTheme]);

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
