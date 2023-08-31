import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ArticleRequestInterface} from "../../shared/utils/articlerequest.interface";
import {map, Observable} from "rxjs";
import {ArticleInterface} from "../../shared/types/article.interface";
import {environment} from "../../../environments/environment";
import {ArticleResponseInterface} from "../../shared/types/articleresponse.interface";


@Injectable({
  providedIn: 'root'
})
export class CreatearticleService {

  constructor(private http: HttpClient) { }
  createArticle(articleRequest: ArticleRequestInterface): Observable<ArticleInterface> {
    const fullUrl = environment.apiurl + '/articles'

    return this.http.post<ArticleResponseInterface>(fullUrl, articleRequest).pipe(
      map((response) => response.article)
    )
  }
}
