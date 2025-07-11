import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: '/task-form.html'
})
export class TaskFormComponent {
  @Output() add = new EventEmitter<{title: string, desc?: string}>();

  submit(f: NgForm) {
    if (f.valid) {
      this.add.emit({ title: f.value.title, desc: f.value.desc });
      f.resetForm();
    }
  }
}
