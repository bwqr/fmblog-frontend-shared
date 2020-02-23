import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {

  section: any;

  defaultSection = {
    name: '',
    flags: 0
  }

  constructor(
    public dialogRef: MatDialogRef<SectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.section = data || this.defaultSection;
   }

  ngOnInit() {
  }

  save() {
    this.dialogRef.close(this.section);
  }

  close() {
    this.dialogRef.close(false);
  }
}
