import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {GetFeedResponseInterface} from "../home/projects/types/getfeedresponse.interface";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProjectsFeedService {

  constructor(private http: HttpClient) { }

  getFeed(url: string): Observable<GetFeedResponseInterface> {
    const fullUrl = environment.apiurl + url;
    return this.http.get<GetFeedResponseInterface>(fullUrl)
  }
}
