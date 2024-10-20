import { inject, Injectable } from '@angular/core';
import { Task } from './task';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskServiceService {
  // setup repo
  constructor() {}
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  tasksx = new BehaviorSubject<Task[] | null>(JSON.parse(this.localStorageService.getItem("tasks") ?? '[]'));
  tasks: Task[] = [
    {
      id: 1,
      name: 'Example 1',
      status: false,
    },
    {
      id: 2,
      name: 'Example 2',
      status: false,
    },
    {
      id: 3,
      name: 'Example 3',
      status: false,
    },
    {
      id: 4,
      name: 'Example 4',
      status: true,
    },
  ];

  initTasks(): void {
    // this.localStorageService.setItem("tasks", JSON.stringify(this.tasks))
    this.tasksx.next(this.tasks)
  }

  getAllTasks(): Task[] {
    return JSON.parse(this.localStorageService.getItem("tasks")!);
  }

  changeTaskStatus(task_id: number): void {
    var data: Task[]  = JSON.parse(this.localStorageService.getItem("tasks") ?? "[]");
    data.find(prd => prd.id === task_id)!.status = data.find(prd => prd.id === task_id)?.status ? false : true;
    this.localStorageService.setItem("tasks", JSON.stringify(data));
  }

  removeTask(id: number) {
    var data: Task[]  = JSON.parse(this.localStorageService.getItem("tasks") ?? "[]");
    data = data.filter(prd => prd.id !== id);
    console.log(data)
    this.localStorageService.setItem("tasks", JSON.stringify(data));
  }
}
