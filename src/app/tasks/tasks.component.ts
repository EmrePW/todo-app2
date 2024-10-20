import { Component, inject, Input } from '@angular/core';
import { Task } from '../task';
import { TaskServiceService } from '../task-service.service';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [],
  template: `
    <section class="task">
      <div class="left">
        <button
          type="button"
          [class]="['check-button', this.task.status ? 'completed' : '']"
          (click)="changeState()"
        >
          <img
            src="/icon-check.svg"
            alt=""
            [style]="!this.task.status ? 'display:none' : ''"
          />
        </button>
        <p [class]="['task_name', this.task.status ? 'completed-task' : '']" (click)="changeState()">
          {{ task.name }}
        </p>
      </div>
      <button type="button" (click)="removeTask()">
        <img src="/icon-cross.svg" alt="" />
      </button>
    </section>
  `,
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {
  @Input() task!: Task;
  taskService: TaskServiceService = inject(TaskServiceService);

  changeState() {
    this.taskService.changeTaskStatus(this.task.id);
  }

  removeTask() {
    this.taskService.removeTask(this.task.id);
  }

  asd(x: Task[]) {
    // update
    this.taskService.tasksx.next(x); // delete old data
    localStorage.setItem("tasks", JSON.stringify(this.taskService.tasksx.value))
  }
  constructor() {}
}
