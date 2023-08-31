import {CurrentUserInterface} from "./currentuser.interface";

export interface CurrentUserRequestInterface {
  user: CurrentUserInterface & {password: string}
}
