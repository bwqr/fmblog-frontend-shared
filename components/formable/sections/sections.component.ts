import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SectionComponent } from '../section/section.component';
import { Subscription } from 'rxjs';
import { FieldComponent } from '../field/field.component';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss']
})
export class SectionsComponent implements OnInit {

  subs = new Subscription();

  @Input() title: string;

  @Input() sections: Array<any>

  @Input() service: any;

  @Input() flags: number;

  @Output() createFieldCallback = new EventEmitter();

  @Output() createField = new EventEmitter();

  @Output() createSection = new EventEmitter();

  @Output() deleteField = new EventEmitter();

  @Output() deleteSection = new EventEmitter();

  @Output() updateSection = new EventEmitter();

  @Output() updateField = new EventEmitter();

  @Output() updateWeights = new EventEmitter();

  isEditting = false;

  isDeleting = false;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openAddSection() {
    const dialogRef = this.dialog.open(SectionComponent, {
      disableClose: true,
      data: {
        name: '',
        flags: this.flags
      }
    });

    this.subs.add(
      dialogRef.afterClosed().subscribe(result => {
        if (!result) {
          return;
        }

        this.createSection.emit(result);
      })
    );
  }

  openAddField() {
    if (this.createFieldCallback.observers.length !== 0) {
      this.createFieldCallback.emit(this.sections);
    } else {
      const dialogRef = this.dialog.open(FieldComponent, {
        disableClose: true,
        data: {
          field: null,
          sections: this.sections
        }
      });

      this.subs.add(
        dialogRef.afterClosed().subscribe(result => {
          if (!result) {
            return;
          }
          const data = {
            name: this.service.uuidv4(),
            title: result.title,
            type: result.type,
            placeholder: result.placeholder,
            options: result.options.map(option => ({ title: option, value: this.service.uuidv4() })),
            section_id: result.section_id
          };

          this.createField.emit(data);
        })
      );
    }
  }

  openEditField(field: any) {
    const dialogRef = this.dialog.open(FieldComponent, {
      disableClose: true,
      data: {
        field: this.deepCopy(field),
        sections: this.sections
      }
    });

    this.subs.add(
      dialogRef.afterClosed().subscribe(result => {
        if (!result) {
          return;
        }

        const data = {
          title: result.title,
          placeholder: result.placeholder,
          section_id: result.section_id,
          id: result.id
        };

        this.updateField.emit(data);
      })
    );
  }

  openEditSection(section: any) {
    const dialogRef = this.dialog.open(SectionComponent, {
      disableClose: true,
      data: this.deepCopy(section)
    });

    this.subs.add(
      dialogRef.afterClosed().subscribe(result => {
        if (!result) {
          return;
        }

        this.updateSection.emit(result);
      })
    );
  }

  emitDeleteSection(section: any) {
    this.deleteSection.emit(section.id)
  }

  emitDeleteField(field: any) {
    this.deleteField.emit(field.id);
  }

  saveSectionAndFormFieldOrders() {
    const sectionWeights = [];
    const formFieldWeights = [];

    for (let i = 0; i < this.sections.length; i++) {
      const section = this.sections[i];

      sectionWeights.push({ id: section.id, weight: i });

      for (let j = 0; j < section.form_fields.length; j++) {
        const formField = section.form_fields[j];

        formFieldWeights.push({ id: formField.id, weight: j });
      }
    }
    this.updateWeights.emit({
      sections: sectionWeights,
      form_fields: formFieldWeights
    });
  }

  deepCopy(data: any) {
    return JSON.parse(JSON.stringify(data));
  }
}
