import { Component, inject, Output, EventEmitter } from '@angular/core';
import { Task } from '../task';
import { CommonModule } from '@angular/common';
import { TaskServiceService } from '../task-service.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section *ngFor="let task of tasks" class="task">
      <div class="left">
        <button
          type="button"
          [class]="['check-button', this.task.status ? 'completed' : '']"
          (click)="changeState(task.id)"
        >
          <img
            src="/icon-check.svg"
            alt=""
            [style]="!this.task.status ? 'display:none' : ''"
          />
        </button>
        <p
          [class]="['task_name', this.task.status ? 'completed-task' : '']"
          (click)="changeState(task.id)"
        >
          {{ task.name }}
        </p>
      </div>
      <button type="button" (click)="removeTask(task.id)">
        <img src="/icon-cross.svg" alt="" />
      </button>
    </section>
    <section class="navigation">
      <p>
        {{ activeTaskNumber }}
        items left.
      </p>
      <nav class="desktop-nav">
        <button
          type="button"
          [class]="['nav-button', allActive ? 'active' : '']"
          (click)="showAll()"
        >
          All
        </button>
        <button
          type="button"
          [class]="['nav-button', activeActive ? 'active' : '']"
          (click)="showActive()"
        >
          Active
        </button>
        <button
          type="button"
          [class]="['nav-button', completedActive ? 'active' : '']"
          (click)="showCompleted()"
        >
          Completed
        </button>
      </nav>
      <button type="button" class="nav-button" (click)="clearCompleted()">
        Clear Completed
      </button>
    </section>
    <nav class="mobile-nav">
      <button type="button" class="nav-button">All</button>
      <button type="button" class="nav-button">Active</button>
      <button type="button" class="nav-button">Completed</button>
    </nav>
  `,
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {
  // @Input() task!: Task;
  // @Output() updateActiveCount = new EventEmitter<number>();
  taskService: TaskServiceService = inject(TaskServiceService);
  tasks: Task[] | null;
  activeTaskNumber: number;
  allActive: boolean = true;
  completedActive: boolean = false;
  activeActive: boolean = false;
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('tasks') ?? '[]');
    this.activeTaskNumber =
      this.tasks?.filter((prd) => prd.status !== true).length ?? 0;
  }

  changeState(id: number) {
    // update local (this.tasks)
    for (let task of this.tasks ?? []) {
      if (task.id == id) {
        task.status = !task.status;
      }
    }
    localStorage.setItem('tasks', JSON.stringify(this.tasks)); // update localStorage
    this.taskService.tasks.next(this.tasks); // update behaviour object. (this.taskService.tasks)

    this.taskService.activeTaskCount.next(
      this.tasks?.filter((prd) => prd.status !== true).length ?? 0
    );
    this.activeTaskNumber = this.taskService.activeTaskCount.value ?? 0;
    // this.updateActiveCount.emit();
  }

  removeTask(id: number) {
    this.tasks = this.tasks?.filter((prd) => prd.id != id) ?? [];
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.taskService.tasks.next(this.tasks);
    this.activeTaskNumber =
      this.tasks?.filter((prd) => prd.status !== true).length ?? 0;
  }

  clearCompleted() {
    let new_tasks: Task[] | undefined = this.taskService.tasks.value?.filter(
      (prd) => prd.status == false
    );
    this.tasks = new_tasks ?? [];
    localStorage.setItem('tasks', JSON.stringify(new_tasks ?? [])); // update localStorage
    this.taskService.tasks.next(new_tasks ?? []); // update behaviour object. (this.taskService.tasks)
  }

  showAll() {
    this.tasks = this.taskService.tasks.value;
    this.allActive = true;
    this.activeActive = false;
    this.completedActive = false;
  }

  showActive() {
    this.tasks =
      this.taskService.tasks.value?.filter((prd) => prd.status == false) ?? [];
    this.allActive = false;
    this.activeActive = true;
    this.completedActive = false;
  }

  showCompleted() {
    this.tasks =
      this.taskService.tasks.value?.filter((prd) => prd.status == true) ?? [];
    this.allActive = false;
    this.activeActive = false;
    this.completedActive = true;
  }
}
