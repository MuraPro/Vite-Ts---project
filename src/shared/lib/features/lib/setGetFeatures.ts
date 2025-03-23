// import { FeatureFlags } from '@/shared/types/featureFlags';

// // ФИЧИ НЕ МЕНЯЮТСЯ В ХОДЕ СЕССИИ, ИХ НЕОБЯЗАТЕЛЬНО ДЕЛАТЬ РЕАКТИВНЫМИ!
// let featureFlags: FeatureFlags = {};

// export function setFeatureFlags(newFeatureFlags?: FeatureFlags) {
//     if (newFeatureFlags) {
//         featureFlags = newFeatureFlags;
//     }
// }

// export function getFeatureFlag(flag: keyof FeatureFlags): boolean {
//     // Проверяем, что featureFlags инициализирован
//     if (!featureFlags) {
//         console.warn('Feature flags not initialized');
//         return false; // Возвращаем false или другое значение по умолчанию
//     }

//     return featureFlags[flag] ?? false; // Если флаг не найден, возвращаем false
// }

// export function getAllFeatureFlags() {
//     return featureFlags;
// }
import { LOCAL_STORAGE_LAST_DESIGN_KEY } from '@/shared/const/localstorage';
import { FeatureFlags } from '@/shared/types/featureFlags';

const defaultFeatures: FeatureFlags = {
    isAppRedesigned:
        localStorage.getItem(LOCAL_STORAGE_LAST_DESIGN_KEY) === 'new',
};
// ФИЧИ НЕ МЕНЯЮТСЯ В ХОДЕ СЕССИИ, ИХ НЕОБЯЗАТЕЛЬНО ДЕЛАТЬ РЕАКТИВНЫМИ!
let featureFlags: FeatureFlags = {
    ...defaultFeatures,
};

export function setFeatureFlags(newFeatureFlags?: FeatureFlags) {
    if (newFeatureFlags) {
        featureFlags = newFeatureFlags;
    }
}

export function getFeatureFlag(flag: keyof FeatureFlags) {
    return featureFlags[flag];
}

export function getAllFeatureFlags() {
    return featureFlags;
}
