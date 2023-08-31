import {BackendErrorsInterface} from "../../shared/types/backenderrors.interface";

export interface SettingsStateInterface {
  isSubmitting: boolean
  validationErrors: BackendErrorsInterface | null
}
