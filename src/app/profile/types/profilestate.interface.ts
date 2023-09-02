import {ProfileInterface} from "./profile.interface";

export interface ProfileStateInterface {
  data: ProfileInterface | null
  isLoading: boolean
  error: string | null
}
