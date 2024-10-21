import { inject, Injectable } from '@angular/core';
import { Task } from './task';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskServiceService {
  // setup repo
  constructor() {}
  tasks = new BehaviorSubject<Task[] | null>(
    JSON.parse(localStorage.getItem('tasks') ?? '[]')
  );

  // activeTaskCount: number =
  //   this.tasks.value?.filter((prd) => prd.status !== true).length ?? 0;

  activeTaskCount = new BehaviorSubject<number | null>(
    this.tasks.value?.filter((prd) => prd.status !== true).length ?? 0
  );
}
