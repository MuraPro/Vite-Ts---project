import { ArticleDetailsCommentsSchema } from './ArticleDetailsCommentsSchema';
import { ArticleDetailsRecommendationsSchema } from './ArticleDetailsRecommendationsSchema';

export interface ArticleDetailsPageSchema {
    recommendations: ArticleDetailsRecommendationsSchema;
    comments: ArticleDetailsCommentsSchema;
}
