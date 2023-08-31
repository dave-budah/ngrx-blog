import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {ArticleRequestInterface} from "../../../shared/utils/articlerequest.interface";
import {ArticleInterface} from "../../../shared/types/article.interface";
import {BackendErrorsInterface} from "../../../shared/types/backenderrors.interface";

export const updatearticleActions = createActionGroup({
  source: 'update article',
  events: {
    'Get article': props<{ slug: string}>(),
    'Get article success': props<{ article: ArticleInterface}>(),
    'Get article failure': emptyProps(),

    'Update article': props<{ request: ArticleRequestInterface, slug: string}>(),
    'Update article success': props<{ article: ArticleInterface}>(),
    'Update article failure': props<{errors: BackendErrorsInterface}>()
  }
})
