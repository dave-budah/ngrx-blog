import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ArticleInterface} from "../types/article.interface";
import {map, Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {ArticleResponseInterface} from "../types/articleresponse.interface";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }
  getArticle(slug: string): Observable<ArticleInterface> {
    const fullUrl = `${environment.apiurl}/articles/${slug}`
    return this.http.get<ArticleResponseInterface>(fullUrl).pipe(map((response) => response.article))
  }
}
