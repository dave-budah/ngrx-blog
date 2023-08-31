import {BackendErrorsInterface} from "../../../shared/types/backenderrors.interface";
import {ArticleInterface} from "../../../shared/types/article.interface";

export interface UpdateArticleStateInterface {
  article: ArticleInterface | null
  isLoading: boolean
  isSubmitting: boolean
  validationErrors: BackendErrorsInterface | null
}
