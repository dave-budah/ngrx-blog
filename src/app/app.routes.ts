import {Route} from "@angular/router";

export const appRoutes: Route[] = [
  {
    path: 'signup',
    loadChildren: () => import('src/app/authentication/types/auth.routes').then(m => m.signupRoutes)
  },
  {
    path: 'login',
    loadChildren: () => import('src/app/authentication/types/auth.routes').then(m => m.loginRoutes)
  },
  {
    path: 'blog',
    loadChildren: () => import('src/app/globalfeed/feed.routes').then(m => m.routes)
  },
  {
    path: 'feed',
    loadChildren: () => import('src/app/yourfeed/yourfeed.routes').then(m => m.routes)
  },
  {
    path: 'tags/:slug',
    loadChildren: () => import('src/app/tagfeed/tagfeed.routes').then(m => m.routes)
  },
  {
    path: 'articles/new',
    loadChildren: () => import('src/app/articlecrud/createarticle/createarticle.routes').then(m => m.routes)
  },
  {
    path: 'articles/:slug',
    loadChildren: () => import('src/app/article/article.routes').then(m => m.routes)
  },
  {
    path: 'articles/:slug/edit',
    loadChildren: () => import('src/app/articlecrud/updatearticle/updatearticle.routes').then(m => m.routes)
  },
  {
    path: 'settings',
    loadChildren: () => import('src/app/settings/settings.routes').then(m => m.routes)
  }
]
