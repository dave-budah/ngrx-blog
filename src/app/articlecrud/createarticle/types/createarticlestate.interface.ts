import {BackendErrorsInterface} from "../../../shared/types/backenderrors.interface";

export interface CreateArticleStateInterface {
  isSubmitting: boolean
  validationErrors: BackendErrorsInterface | null
}
