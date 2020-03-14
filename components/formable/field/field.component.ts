import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {

  field: any;

  sections: Array<any>;

  documents: Array<any>;

  defaultField = {
    name: '',
    title: '',
    type: '',
    placeholder: '',
    options: []
  };

  get isNewField(): boolean {
    return !('id' in this.field);
  }

  types: Array<any> = [
    { type: 'radio', name: 'Radio' },
    { type: 'text', name: 'Text' },
    { type: 'email', name: 'E-mail' },
    { type: 'checkbox', name: 'Checkbox' },
    { type: 'file', name: 'File' },
    { type: 'number', name: 'Number' },
    { type: 'select', name: 'Select' },
    { type: 'g-recaptcha', name: 'ReCaptcha'}
  ];

  constructor(
    public dialogRef: MatDialogRef<FieldComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.field = data.field || this.defaultField;
    this.sections = data.sections;
  }

  ngOnInit() {
  }

  save() {
    this.dialogRef.close(this.field);
  }

  close() {
    this.dialogRef.close(false);
  }

  addOption(option: any) {
    const value = option.value;

    if (typeof value !== 'undefined' && value.trim()) {
      this.field.options.push(value);

      option.value = '';
    }
  }

  removeOption(index: number) {
    this.field.options.splice(index, 1);
  }
}
