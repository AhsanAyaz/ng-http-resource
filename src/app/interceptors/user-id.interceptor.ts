import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TodosService } from '../todos.service';

export const userIdInterceptor: HttpInterceptorFn = (req, next) => {
  const todosService = inject(TodosService);
  const userId = todosService.user()?.id;
  console.log(req);
  if (req.url.endsWith('/todos') && userId) {
    req = req.clone({
      headers: req.headers.set('x-user-id', userId.toString()),
    });
  }
  return next(req);
};
