import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectFormValuesInterface} from "./types/projectformvalues.interface";
import {BackendErrorsInterface} from "../../types/backenderrors.interface";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ArticleFormValuesInterface} from "../articleform/types/articleformvalues.interface";
import {AngularEditorModule} from "@kolkov/angular-editor";
import {ErrormsgComponent} from "../errormsg/errormsg.component";

@Component({
  selector: 'projectform',
  standalone: true,
  imports: [CommonModule, AngularEditorModule, ErrormsgComponent, ReactiveFormsModule],
  templateUrl: './projectform.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectformComponent implements OnInit {
  @Input() initialValues?: ProjectFormValuesInterface
  @Input() isSubmitting: boolean = false
  @Input() errors: BackendErrorsInterface | null = null

  @Output() projectSubmit = new EventEmitter<ProjectFormValuesInterface>();


  form = this._formBuilder.nonNullable.group({
    image: ['', [Validators.required]],
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    site: ['', [Validators.required]],
    github: ['', [Validators.required]],
  })
  constructor(private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    if (!this.initialValues) {
      throw new Error('No initial values')
    }
    this.form.patchValue({
      title: this.initialValues.title,
      description: this.initialValues.description,
      image: this.initialValues.image,
      site: this.initialValues.site,
      github: this.initialValues.github
    })
  }

  onSubmit(): void {
    const formValue = this.form.getRawValue()
    const projectFormValues: ProjectFormValuesInterface = {
      ...formValue,
    }
    this.projectSubmit.emit(projectFormValues)
  }
}
