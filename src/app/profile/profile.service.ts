import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {ProfileInterface} from "./types/profile.interface";
import {environment} from "../../environments/environment";
import {GetProfileResponseInterface} from "./types/getprofileresponse.interface";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getProfile(slug: string): Observable<ProfileInterface> {
    const url = `${environment.apiurl}/profiles/${slug}`;

    return this.http.get<GetProfileResponseInterface>(url).pipe(map((response) => response.profile))
  }
}
