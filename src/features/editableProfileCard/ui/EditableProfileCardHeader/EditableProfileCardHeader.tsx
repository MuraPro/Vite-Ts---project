import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { CgProfile } from 'react-icons/cg';
import { GrEdit } from 'react-icons/gr';
import { TbPencilCancel } from 'react-icons/tb';
import { VscSaveAs } from 'react-icons/vsc';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
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
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Card padding="24" max border="partial">
                    <HStack
                        max
                        justify="between"
                        className={classNames(
                            cls['profile__header-container'],
                            {},
                            [className],
                        )}
                    >
                        <Text
                            title={t('Профиль')}
                            size="l"
                            className={cls['profile__header-title']}
                        />
                        {canEdit && (
                            <div>
                                {readonly ? (
                                    <Button
                                        onClick={onEdit}
                                        data-testid="EditableProfileCardHeader.EditButton"
                                    >
                                        {t('Редактировать')}
                                    </Button>
                                ) : (
                                    <HStack gap="8">
                                        <Button
                                            onClick={onCancelEdit}
                                            data-testid="EditableProfileCardHeader.CancelButton"
                                            color="error"
                                        >
                                            {t('Отменить')}
                                        </Button>
                                        <Button
                                            onClick={onSave}
                                            data-testid="EditableProfileCardHeader.SaveButton"
                                            color="success"
                                        >
                                            {t('Сохранить')}
                                        </Button>
                                    </HStack>
                                )}
                            </div>
                        )}
                    </HStack>
                </Card>
            }
            off={
                <HStack
                    justify={'between'}
                    max
                    className={classNames(cls.profile__header, {}, [className])}
                >
                    <TextDeprecated
                        title={t('Профиль')}
                        className={cls['profile__header-title']}
                        icon={CgProfile}
                        titlePersonalClass={cls['profile__header-box']}
                    />
                    {canEdit && (
                        <>
                            {readonly ? (
                                <ButtonDeprecated
                                    className={cls['profile__header-btn']}
                                    theme={ButtonTheme.PRIMARY}
                                    onClick={onEdit}
                                >
                                    <GrEdit
                                        className={cls.edit__icon}
                                        size={20}
                                    />
                                    {t('Редактировать')}
                                </ButtonDeprecated>
                            ) : (
                                <HStack
                                    gap={'8'}
                                    justify={'between'}
                                    align={'center'}
                                    className={cls['profile__header-panel']}
                                >
                                    <ButtonDeprecated
                                        className={cls['profile__header-btn']}
                                        theme={ButtonTheme.PRIMARY}
                                        onClick={onCancelEdit}
                                    >
                                        <TbPencilCancel
                                            className={cls.edit__icon}
                                            size={25}
                                        />
                                        {t('Отменить')}
                                    </ButtonDeprecated>
                                    <ButtonDeprecated
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
                                    </ButtonDeprecated>
                                </HStack>
                            )}
                        </>
                    )}
                </HStack>
            }
        />
    );
};
