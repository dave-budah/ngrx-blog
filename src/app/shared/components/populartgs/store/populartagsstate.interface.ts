import {PopularTagType} from "../../../types/populartag.interface";

export interface PopularTagsStateInterface {
  isLoading: boolean;
  error: string | null;
  data: PopularTagType[] | null;
}
