import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }
  deleteArticle(slug: string): Observable<{}> {
    const fullUrl = `${environment.apiurl}/articles/${slug}`
    return this.http.delete(fullUrl)
  }
}
