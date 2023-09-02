import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Params, Router, RouterLink, RouterLinkActive} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {profileActions} from "./store/profile.actions";
import {selectError, selectIsLoading, selectProfileData} from "./store/profile.reducers";
import {combineLatest, filter, map} from "rxjs";
import {selectCurrentUser} from "../authentication/store/auth.reducers";
import {CurrentUserInterface} from "../shared/types/currentuser.interface";
import {ProfileInterface} from "./types/profile.interface";
import {FeedComponent} from "../shared/components/feed/feed.component";

@Component({
  selector: 'profile',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FeedComponent],
  templateUrl: './profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
  slug: string = ''
  isCurrentUserProfile$ = combineLatest({
    currentUser: this.store.pipe(
      select(selectCurrentUser),
      filter((currentUser): currentUser is CurrentUserInterface => Boolean(currentUser))
    ),
    profile: this.store.pipe(
      select(selectProfileData),
      filter((profile): profile is ProfileInterface => Boolean(profile))
    ),
  }).pipe(
    map(({currentUser, profile}) => {
      return currentUser.username === profile.username
    })
  )
  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    profile: this.store.select(selectProfileData),
    isCurrentUser: this.isCurrentUserProfile$
  })
  constructor(private route: ActivatedRoute, private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.slug = params['slug']
      this.fetchProfile()
    })
  }

  private fetchProfile() {
    this.store.dispatch(profileActions.getProfile({slug: this.slug}))
  }

  getApiUrl(): string {
    const isFavorites = this.router.url.includes('favorites')
    return isFavorites ? `/articles?favorited=${this.slug}` : `/articles?author=${this.slug}`
  }
}
