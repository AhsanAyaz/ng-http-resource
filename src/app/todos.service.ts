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
  todosResource = httpResource<Todo[]>(() => {
    const user = this.user();
    if (!user) {
      return undefined;
    }
    return `https://jsonplaceholder.typicode.com/users/${
      this.user()?.id
    }/todos`;
  });

  todosResourceError = computed(() => {
    const error = this.todosResource.error() as Error;
    if (!error) {
      return null;
    }
    return error.message;
  });
}
