import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PopularTagType} from "../types/populartag.interface";
import {map, Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {GetPopularTagResponseInterface} from "../types/getpopulartagresponse.interface";

@Injectable({
  providedIn: 'root'
})
export class PopulartagService {

  constructor(private http: HttpClient) { }

  getPopularTags(): Observable<PopularTagType[]> {
    const url = environment.apiurl + '/tags'
    return this.http.get<GetPopularTagResponseInterface>(url).pipe(map((response) => response.tags))
  }
}
