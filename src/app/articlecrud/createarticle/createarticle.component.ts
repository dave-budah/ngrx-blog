import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArticleFormValuesInterface} from "../../shared/components/articleform/types/articleformvalues.interface";
import {ArticleformComponent} from "../../shared/components/articleform/articleform.component";
import {Store} from "@ngrx/store";
import {selectIsSubmitting, selectValidationErrors} from "./store/createarticle.reducers";
import {combineLatest} from "rxjs";
import {ArticleRequestInterface} from "../../shared/utils/articlerequest.interface";
import {createArticleActions} from "./store/createarticle.actions";

@Component({
  selector: 'createarticle',
  standalone: true,
  imports: [CommonModule, ArticleformComponent],
  templateUrl: './createarticle.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class CreatearticleComponent {
  initialValues = {
    title: '',
    description: '',
    body: '',
    tagList: [],
    image: '',
  }

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors)
  })
  constructor(private store: Store) {
  }

  onSubmit(articleFormValues: ArticleFormValuesInterface) {
    const  request: ArticleRequestInterface = {
      article: articleFormValues,
    }
    this.store.dispatch(createArticleActions.createArticle({request}))
  }
}
