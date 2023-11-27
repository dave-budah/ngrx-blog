import {ProfileInterface} from "./profile.interface";
import {PopularTagType} from "./populartag.interface";

export interface ArticleInterface {
  image?: string
  body: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: PopularTagType[];
  title: string;
  updatedAt: string;
  author: ProfileInterface
}
