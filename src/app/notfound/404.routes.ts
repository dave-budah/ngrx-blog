import {Route} from "@angular/router";
import {NotfoundComponent} from "./notfound.component";


export const routes: Route[] = [
  {
    path: '',
    component: NotfoundComponent,
    title: '404 Not Found',
  }
]
