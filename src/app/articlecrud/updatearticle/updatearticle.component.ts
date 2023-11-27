import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArticleFormValuesInterface} from "../../shared/components/articleform/types/articleformvalues.interface";
import {ArticleformComponent} from "../../shared/components/articleform/articleform.component";
import {select, Store} from "@ngrx/store";
import {
  selectArticle,
  selectIsLoading,
  selectIsSubmitting,
  selectValidationErrors
} from "./store/updatearticle.reducers";
import {combineLatest, filter, map, Observable} from "rxjs";
import {ArticleRequestInterface} from "../../shared/utils/articlerequest.interface";
import {updatearticleActions} from "./store/updatearticle.actions";
import {LoadingComponent} from "../../shared/components/loading/loading.component";
import {ActivatedRoute} from "@angular/router";
import {ArticleInterface} from "../../shared/types/article.interface";

@Component({
  selector: 'createarticle',
  standalone: true,
  imports: [CommonModule, ArticleformComponent, LoadingComponent],
  templateUrl: './updatearticle.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class UpdatearticleComponent implements OnInit {
  slug = this.route.snapshot.paramMap.get('slug') ?? ''
  initialValues$: Observable<ArticleFormValuesInterface> = this.store.pipe(
    select(selectArticle),
    filter((article): article is ArticleInterface => article !== null),
    map((article: ArticleInterface) => {
      return {
        title: article.title,
        description: article.description,
        body: article.body,
        tagList: article.tagList,
        image: article.image,
      }
    })
  )
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    isLoading: this.store.select(selectIsLoading),
    backendErrors: this.store.select(selectValidationErrors),
    initialValues: this.initialValues$
  })

  constructor(private store: Store, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.store.dispatch(updatearticleActions.getArticle({slug: this.slug}))
  }

  onSubmit(articleFormValues: ArticleFormValuesInterface) {
    const  request: ArticleRequestInterface = {
      article: articleFormValues,
    }
    this.store.dispatch(updatearticleActions.updateArticle({request, slug: this.slug}))
  }
}
