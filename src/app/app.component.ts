import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskServiceService } from './task-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: ` <main>
    <router-outlet></router-outlet>
  </main>`,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'todo-app';
  constructor(private taskService: TaskServiceService) {

  }
}