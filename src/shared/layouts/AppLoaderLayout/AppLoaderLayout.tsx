import { memo } from 'react';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { MainLayout } from '../MainLayout';
import cls from './AppLoaderLayout.module.scss';

export const AppLoaderLayout = memo(() => {
    return (
        <MainLayout
            header={
                <HStack className={cls.header}>
                    <Skeleton
                        width={40}
                        height={40}
                        customStyles={{ marginLeft: '20px' }}
                    />
                </HStack>
            }
            content={
                <VStack gap="16" style={{ height: '100vh' }}>
                    <Skeleton width="70%" height={32} border="16px" />
                    <Skeleton width="40%" height={20} border="16px" />
                    <Skeleton width="50%" height={20} border="16px" />
                    <Skeleton width="30%" height={32} border="16px" />
                    <Skeleton width="80%" height="40%" border="16px" />
                    <Skeleton width="80%" height="40%" border="16px" />
                </VStack>
            }
        />
    );
});
