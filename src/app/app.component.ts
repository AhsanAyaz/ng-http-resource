import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersService } from './users.service';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { TodosService } from './todos.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoadingSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  usersService = inject(UsersService);
  todosService = inject(TodosService);

  constructor() {
    effect(() => {
      const users = this.usersService.usersResource.value();
      if (users.length && !this.todosService.user()) {
        this.todosService.user.set(users[0]);
      }
    });
  }
}
