import {ProfileInterface} from "../../../shared/types/profile.interface";

export interface ProjectInterface {
  slug: string;
  title: string
  description: string
  github: string
  site: string
  image: string
  createdAt: string
  updatedAt: string
  author: ProfileInterface
}
