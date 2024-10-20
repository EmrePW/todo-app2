import { Component, inject } from '@angular/core';
import { TasksComponent } from '../tasks/tasks.component';
import { CommonModule } from '@angular/common';
import { Task } from '../task';
import { TaskServiceService } from '../task-service.service';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TasksComponent, CommonModule],
  template: `
    <main>
      <div class="top-wrapper">
        <section class="TODO_switch">
          <h1>TODO</h1>
          <button type="button">
            <img src="/icon-sun.svg" alt="" />
          </button>
        </section>
        <section class="tasks">
          <section class="search-bar">
            <button type="button"></button>
            <input type="text" placeholder="Create a new todo..." />
          </section>
          <div class="tasks-wrapper">
            <app-tasks *ngFor="let task of tasks" [task]="task"></app-tasks>
            <section class="navigation">
              <p>
                {{ activeTaskCount }}
                items left.
              </p>
              <nav class="desktop-nav">
                <button type="button" class="nav-button active">All</button>
                <button type="button" class="nav-button">Active</button>
                <button type="button" class="nav-button">Completed</button>
              </nav>
              <button type="button" class="nav-button">Clear Completed</button>
            </section>
          </div>
        </section>
        <nav class="mobile-nav">
          <button type="button" class="nav-button">All</button>
          <button type="button" class="nav-button">Active</button>
          <button type="button" class="nav-button">Completed</button>
        </nav>
        <section class="dd-info">
          <p>Drag and drop to reorder list</p>
        </section>
      </div>
    </main>
  `,
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  taskService: TaskServiceService = inject(TaskServiceService);
  localStorageService: LocalStorageService = inject(LocalStorageService)
  tasks: Task[] | null;
  activeTaskCount:number;
  

  constructor() {
    // this.tasks = this.taskService.getAllTasks();
    this.tasks = this.taskService.tasksx.value
    this.activeTaskCount = this.tasks?.filter((prd) => prd.status === false).length ?? 0;
  }
}
