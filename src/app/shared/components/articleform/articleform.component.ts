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
import {ArticleFormValuesInterface} from "./types/articleformvalues.interface";
import {BackendErrorsInterface} from "../../types/backenderrors.interface";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ErrormsgComponent} from "../errormsg/errormsg.component";
import {NgxSummernoteModule} from "ngx-summernote";
import {AngularEditorConfig, AngularEditorModule} from "@kolkov/angular-editor";
import {HttpClientModule} from "@angular/common/http";


@Component({
  selector: 'articleform',
  standalone: true,
  imports: [CommonModule, ErrormsgComponent, ReactiveFormsModule, AngularEditorModule, HttpClientModule],
  templateUrl: './articleform.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleformComponent implements OnInit{
  @Input() initialValues?: ArticleFormValuesInterface
  @Input() isSubmitting?: boolean = false
  @Input() errors: BackendErrorsInterface | null = null
  @Output() articleSubmit = new EventEmitter<ArticleFormValuesInterface>()

  preview: string | undefined;

  form = this._formBuilder.nonNullable.group({
    image: ['', [Validators.required]],
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    body: ['', [Validators.required]],
    tagList: '',
  })

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    outline: false,
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['insertVideo']
    ]
  };
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
      body: this.initialValues.body,
      tagList: this.initialValues.tagList.join(' '),
      image: this.initialValues.image
    })
  }
  onSubmit(): void {
    const formValue = this.form.getRawValue()
    const articleFormValues: ArticleFormValuesInterface = {
      ...formValue,
      tagList: formValue.tagList.split(' '),
    }
    this.articleSubmit.emit(articleFormValues)
  }

}
