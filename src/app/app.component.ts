import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersService } from './users.service';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { TodosService } from './todos.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoadingSpinnerComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  usersService = inject(UsersService);
  todosService = inject(TodosService);
  newTodoInput = signal('');

  addNewTodo() {
    const title = this.newTodoInput();
    if (!title) {
      return;
    }
    this.todosService.newTodoInput.set({
      completed: false,
      title,
    });
    this.newTodoInput.set('');
  }
}
