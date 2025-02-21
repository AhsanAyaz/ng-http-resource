import { httpResource } from '@angular/common/http';
import { computed, Injectable } from '@angular/core';

export type User = {
  id: number;
  name: string;
};

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  usersResource = httpResource<User[]>(
    'https://jsonplaceholder.typicode.com/users',
    {
      defaultValue: [],
    }
  );

  usersResourceError = computed(() => {
    const error = this.usersResource.error() as Error;
    if (!error) {
      return null;
    }
    return error.message;
  });
}
