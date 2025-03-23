import { memo } from 'react';
import { ToggleFeatures } from '@/shared/lib/features';
import { ArticleDetailsDeprecated } from './ArticleDetailsDeprecated/ArticleDetailsDeprecated';
import { ArticleDetailsRedisigned } from './ArticleDetailsRedisigned/ArticleDetailsRedisigned';

interface ArticleDetailsProps {
    className?: string;
    id?: string;
}

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
    const { id } = props;
    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={<ArticleDetailsRedisigned id={id} />}
            off={<ArticleDetailsDeprecated id={id} />}
        />
    );
});
