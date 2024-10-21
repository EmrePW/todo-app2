import { Component, inject } from '@angular/core';
import { TasksComponent } from '../tasks/tasks.component';
import { CommonModule } from '@angular/common';
import { Task } from '../task';
import { TaskServiceService } from '../task-service.service';

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
          <section class="tasks-wrapper">
            <app-tasks></app-tasks>
            <!-- <app-tasks (updateActiveCount)="updateActiveTasks()"></app-tasks> -->
          </section>
        </section>

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
  tasks: Task[] | null;
  activeTaskCount: number | null;

  constructor() {
    // this.tasks = this.taskService.getAllTasks();
    this.tasks = this.taskService.tasks.value;
    this.activeTaskCount = this.taskService.activeTaskCount.value;
  }

  updateActiveTasks() {
    this.activeTaskCount = this.taskService.activeTaskCount.value;
  }
}
