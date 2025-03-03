import { httpResource } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { User } from './users.service';

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  user = signal<User | null>(null);
  newTodoInput = signal<Partial<Todo> | null>(null);
  todosResource = httpResource<Todo[]>(
    () => {
      const user = this.user();
      if (!user) {
        return undefined;
      }
      return `https://jsonplaceholder.typicode.com/users/${
        this.user()?.id
      }/todos`;
    },
    {
      defaultValue: [],
    }
  );

  newTodoResource = httpResource<Todo>(
    () => {
      const user = this.user();
      if (!user || !this.newTodoInput()) {
        return undefined;
      }
      return {
        url: `https://jsonplaceholder.typicode.com/users/${
          this.user()?.id
        }/todos`,
        method: 'POST',
        body: this.newTodoInput(),
        headers: {
          'Content-Type': 'application/json',
        },
      };
    },
    {
      parse: (val) => {
        const newTodo = val as Todo;
        this.todosResource.update((list) => [newTodo, ...list]);
        this.newTodoInput.set(null);
        return newTodo;
      },
    }
  );

  todosResourceError = computed(() => {
    const error = this.todosResource.error() as Error;
    if (!error) {
      return null;
    }
    return error.message;
  });
}
