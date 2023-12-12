import {GetFeedResponseInterface} from "./getfeedresponse.interface";

export interface FeedStateInterface {
  isLoading: boolean
  error: string | null
  data: GetFeedResponseInterface | null
}
