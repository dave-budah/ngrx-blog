import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProjectformComponent} from "../shared/components/projectform/projectform.component";
import {ProjectFormValuesInterface} from "../shared/components/projectform/types/projectformvalues.interface";
import {Store} from "@ngrx/store";
import {selectIsSubmitting, selectValidationErrors} from "./store/reducer";
import {combineLatest} from "rxjs";
import {ProjectRequestInterface} from "../shared/types/projectrequest";
import {createProjectActions} from "./store/actions";

@Component({
  selector: 'crudproject',
  standalone: true,
  imports: [CommonModule, ProjectformComponent],
  templateUrl: './createproject.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateprojectComponent {
  initialValues = {
    title: '',
    description: '',
    site: '',
    github: '',
    image: '',
  };

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors)
  })
  constructor(private store: Store){}
  onSubmit(projectFormValues: ProjectFormValuesInterface): void {
    const request: ProjectRequestInterface = {
      project: projectFormValues
    }
    this.store.dispatch(createProjectActions.createProject({request}))
  }
}
