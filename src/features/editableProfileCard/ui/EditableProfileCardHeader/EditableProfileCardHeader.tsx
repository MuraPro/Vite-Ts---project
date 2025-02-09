import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { CgProfile } from 'react-icons/cg';
import { GrEdit } from 'react-icons/gr';
import { TbPencilCancel } from 'react-icons/tb';
import { VscSaveAs } from 'react-icons/vsc';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { HStack } from '@/shared/ui/deprecated/Stack';
import { Text } from '@/shared/ui/deprecated/Text';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { profileActions } from '../../model/slice/profileSlice';
import cls from './EditableProfileCardHeader.module.scss';

interface ProfilePageHeaderProps {
    className?: string;
    isLoading?: boolean;
    isValid?: boolean;
}

export const EditableProfileCardHeader = (props: ProfilePageHeaderProps) => {
    const { className, isLoading, isValid } = props;
    const dispatch = useAppDispatch();
    const authData = useSelector(getUserAuthData);
    const profileData = useSelector(getProfileData);
    const canEdit = authData?.id === profileData?.id;
    const readonly = useSelector(getProfileReadonly);

    const { t } = useTranslation();

    const onEdit = useCallback(() => {
        dispatch(profileActions.setReadonly(false));
    }, [dispatch]);

    const onCancelEdit = useCallback(() => {
        dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    const onSave = useCallback(() => {
        dispatch(updateProfileData());
    }, [dispatch]);

    if (isLoading) {
        return null;
    }

    return (
        <HStack
            justify={'between'}
            max
            className={classNames(cls.profile__header, {}, [className])}
        >
            <Text
                title={t('Профиль')}
                className={cls['profile__header-title']}
                icon={CgProfile}
                titlePersonalClass={cls['profile__header-box']}
            />
            {canEdit && (
                <>
                    {readonly ? (
                        <Button
                            className={cls['profile__header-btn']}
                            theme={ButtonTheme.PRIMARY}
                            onClick={onEdit}
                        >
                            <GrEdit className={cls.edit__icon} size={20} />
                            {t('Редактировать')}
                        </Button>
                    ) : (
                        <HStack
                            gap={'8'}
                            justify={'between'}
                            align={'center'}
                            className={cls['profile__header-panel']}
                        >
                            <Button
                                className={cls['profile__header-btn']}
                                theme={ButtonTheme.PRIMARY}
                                onClick={onCancelEdit}
                            >
                                <TbPencilCancel
                                    className={cls.edit__icon}
                                    size={25}
                                />
                                {t('Отменить')}
                            </Button>
                            <Button
                                className={cls['profile__header-btn']}
                                theme={ButtonTheme.PRIMARY}
                                onClick={onSave}
                                disabled={!isValid}
                            >
                                <VscSaveAs
                                    className={cls.edit__icon}
                                    size={25}
                                />
                                {t('Сохранить')}
                            </Button>
                        </HStack>
                    )}
                </>
            )}
        </HStack>
    );
};
