import { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const apiReq = req.clone({
    url: `https://jsonplaceholder.typicode.com${req.url}`,
  });

  return next(apiReq);
};
