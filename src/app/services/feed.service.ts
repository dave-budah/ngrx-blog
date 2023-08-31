import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GetFeedResponseInterface} from "../shared/components/feed/types/getfeedresponse.interface";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private http: HttpClient) { }

  getFeed(url: string): Observable<GetFeedResponseInterface> {
    const fullUrl = environment.apiurl + url;
    return this.http.get<GetFeedResponseInterface>(fullUrl)
  }
}
