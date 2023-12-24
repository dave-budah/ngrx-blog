import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Store} from "@ngrx/store";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {projectActions} from "./store/actions";

import {selectError, selectIsLoading, selectProjectData} from "./store/reducer";
import {combineLatest, filter, map} from "rxjs";
import {selectCurrentUser} from "../authentication/store/auth.reducers";
import {CurrentUserInterface} from "../shared/types/currentuser.interface";

@Component({
  selector: 'project',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './project.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ProjectComponent implements OnInit {
  slug = this.route.snapshot.paramMap.get('slug') ?? ''
  isAuthor$ = combineLatest({
  project: this.store.select(selectProjectData),
    currentUser: this.store
      .select(selectCurrentUser)
      .pipe(
      filter((currentUser): currentUser is CurrentUserInterface | null => currentUser != undefined)),
  }).pipe(
    map(({ project, currentUser}) =>{
      if (!project || !currentUser) {
        return false
      }
      return project.author.username === currentUser.username
  }))

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    project: this.store.select(selectProjectData),
    isAuthor: this.isAuthor$
  })
  constructor(private store: Store, private route: ActivatedRoute){}

  ngOnInit() {
    this.store.dispatch(projectActions.getProject({slug: this.slug }))
  }
  deleteProject(): void {
    this.store.dispatch(projectActions.deleteProject({slug: this.slug}))
  }

}
