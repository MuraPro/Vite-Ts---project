import { FeatureFlags } from '@/shared/types/featureFlags';

// ФИЧИ НЕ МЕНЯЮТСЯ В ХОДЕ СЕССИИ, ИХ НЕОБЯЗАТЕЛЬНО ДЕЛАТЬ РЕАКТИВНЫМИ!
let featureFlags: FeatureFlags = {};

export function setFeatureFlags(newFeatureFlags?: FeatureFlags) {
    if (newFeatureFlags) {
        featureFlags = newFeatureFlags;
    }
}

export function getFeatureFlag(flag: keyof FeatureFlags): boolean {
    // Проверяем, что featureFlags инициализирован
    if (!featureFlags) {
        console.warn('Feature flags not initialized');
        return false; // Возвращаем false или другое значение по умолчанию
    }

    return featureFlags[flag] ?? false; // Если флаг не найден, возвращаем false
}
