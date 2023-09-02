import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddtofavoriteService} from "./services/addtofavorite.service";
import {Store} from "@ngrx/store";
import {addToFavoritesActions} from "./store/reactions.actions";

@Component({
  selector: 'reactions',
  standalone: true,
  imports: [CommonModule],
  providers: [AddtofavoriteService],
  templateUrl: './reactions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ReactionsComponent {
  @Input() isFavorited: boolean = false
  @Input() favoritesCount: number = 0
  @Input() articleSlug: string = ''

  constructor(private store: Store) {
  }

  handleLike(): void {
    this.store.dispatch(
      addToFavoritesActions.addToFavorites({
        isFavorited: this.isFavorited,
        slug: this.articleSlug
      })
    )
    if (this.isFavorited) {
      this.favoritesCount = this.favoritesCount - 1
    } else {
      this.favoritesCount = this.favoritesCount + 1
    }
    this.isFavorited = !this.isFavorited
  }

}
