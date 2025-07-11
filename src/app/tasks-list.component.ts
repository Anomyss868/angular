import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from './task.service';
import { Task } from './task.model';
import { TaskFormComponent } from './task-form-component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskFormComponent, RouterModule],
  templateUrl: '/task-list.html'
})
export class TasksListComponent implements OnInit {
  filter = '';
  tasks: Task[] = [];
  get filteredTasks() {
    return this.tasks.filter(t =>
      t.title.toLowerCase().includes(this.filter.toLowerCase()));
  }

  constructor(public srv: TaskService) {}
  ngOnInit() {
    this.srv.getTasks().subscribe((t: Task[]) => this.tasks = t);
  }

  doAdd(e: {title: string, desc?: string}) {
    this.srv.addTask(e.title, e.desc);
  }
}
