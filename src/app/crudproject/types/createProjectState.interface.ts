import {BackendErrorsInterface} from "../../shared/types/backenderrors.interface";

export interface CreateProjectStateInterface {
  isSubmitting: boolean
  validationErrors: BackendErrorsInterface | null
}
