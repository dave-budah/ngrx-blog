import {Route} from "@angular/router";
import {HomeComponent} from "./home.component";
import {ProjectService} from "../shared/services/project.service";

export const routes: Route[] = [
  {
    path: '',
    component: HomeComponent,
    title: 'Selvigtech | Home',
    providers: [ProjectService]
  }
]
