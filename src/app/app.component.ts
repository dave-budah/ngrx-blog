import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";
import {TopbarComponent} from "./shared/components/topbar/topbar.component";
import {authActions} from "./authentication/store/auth.actions";
import {Store} from "@ngrx/store";
import {FooterComponent} from "./shared/components/footer/footer.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,

  standalone: true,
  imports: [RouterOutlet, RouterLink, NgOptimizedImage, TopbarComponent, FooterComponent],

})
export class AppComponent implements OnInit {
  constructor(private store: Store) {

  }

  ngOnInit(): void {
    this.store.dispatch(authActions.getCurrentUser())

    // Theme Toggle
    const themeBtn = document.querySelector('.theme-btn') as HTMLElement;

    function getCurrentTheme(): string {
      let theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      // @ts-ignore
      localStorage.getItem('selvigtech.theme') ? theme = localStorage.getItem('selvigtech.theme') : null;
      return theme;
    }

    function loadTheme(theme: string): void {
      const root = document.querySelector(':root') as HTMLElement;
      if (theme === 'light'){
        themeBtn.innerHTML = `<i class="bi bi-moon-stars"></i>`;
      } else {
        themeBtn.innerHTML = `<i class="bi bi-brightness-high"></i>`;
      }

      root.setAttribute('color-scheme', `${theme}`);
    }

    themeBtn.addEventListener('click', () => {
      let theme = getCurrentTheme();
      if (theme === 'dark'){
        theme = 'light';
      } else {
        theme = 'dark';
      }
      localStorage.setItem('selvigtech.theme', `${theme}`);
      loadTheme(theme);
    })

    window.addEventListener('DOMContentLoaded', () => {
      loadTheme(getCurrentTheme());
    });

  }

}
