import {CurrentUserInterface} from "../../shared/types/currentuser.interface";
import {BackendErrorsInterface} from "../../shared/types/backenderrors.interface";

export interface AuthStateInterface {
  isSubmitting: boolean;
  currentUser: CurrentUserInterface | null | undefined;
  isLoading: boolean;
  validationErrors: BackendErrorsInterface | null
}
