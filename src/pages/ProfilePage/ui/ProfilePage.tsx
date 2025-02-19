import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { EditableProfileCard } from '@/features/editableProfileCard';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Page } from '@/widgets/Page';
import cls from './ProfilePage.module.scss';

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = memo(({ className }: ProfilePageProps) => {
    const { id } = useParams<{ id: string }>();

    return (
        <Page
            className={classNames(cls.profile__section, {}, [className])}
            data-testid="ProfilePage"
        >
            <div className="_container">
                <VStack gap={'16'} max>
                    <EditableProfileCard id={id} />
                </VStack>
            </div>
        </Page>
    );
});

export default ProfilePage;
