import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {ArticleInterface} from "../../../types/article.interface";

export const addToFavoritesActions = createActionGroup({
  source: 'Add to Favorites',
  events: {
    'Add to Favorites': props<{isFavorited: boolean; slug: string}>(),
    'Add to Favorites success': props<{article: ArticleInterface}>(),
    'Add to Favorites failure': emptyProps()
  }
})
