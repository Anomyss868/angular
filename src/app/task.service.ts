
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from './task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasks: Task[] = [];
  private tasks$ = new BehaviorSubject<Task[]>([]);
  private idSeq = 1;

  getTasks() {
    return this.tasks$.asObservable();
  }

  getTask(id: number) {
    return this.tasks.find(t => t.id === id);
  }

  addTask(title: string, description?: string) {
    const task: Task = { id: this.idSeq++, title, description, done: false };
    this.tasks.push(task);
    this.tasks$.next(this.tasks);
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.tasks$.next(this.tasks);
  }

  toggleDone(id: number) {
    const task = this.getTask(id);
    if (task) {
      task.done = !task.done;
      this.tasks$.next(this.tasks);
    }
  }
}
