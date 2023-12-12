import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {ProjectInterface} from "../../home/projects/types/project.interface";
import {environment} from "../../../environments/environment";
import {ProjectResponseInterface} from "../../home/projects/types/projectresponse.interface";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getProject(slug: string): Observable<ProjectInterface> {
    const fullUrl = `${environment.apiurl}/projects/${slug}`
    return this.http.get<ProjectResponseInterface>(fullUrl).pipe(
      map((response)  => response.project)
    )
  }

  deleteProject(slug: string): Observable<{}> {
    const fullUrl = `${environment.apiurl}/projects/${slug}`
    return this.http.delete<ProjectResponseInterface>(fullUrl)
  }
}
