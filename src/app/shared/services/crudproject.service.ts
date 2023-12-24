import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProjectRequestInterface} from "../types/projectrequest";
import {map, Observable} from "rxjs";
import {ProjectInterface} from "../../home/projects/types/project.interface";
import {environment} from "../../../environments/environment";
import {ProjectResponseInterface} from "../../home/projects/types/projectresponse.interface";

@Injectable({
  providedIn: 'root'
})
export class CrudProjectService {

  constructor(private http: HttpClient) { }

  createProject(projectRequest: ProjectRequestInterface): Observable<ProjectInterface> {
    const fullUrl = environment.apiurl + '/projects/'

    return this.http.post<ProjectResponseInterface>(fullUrl, projectRequest)
      .pipe(map((response) => response.project))
  }
}
