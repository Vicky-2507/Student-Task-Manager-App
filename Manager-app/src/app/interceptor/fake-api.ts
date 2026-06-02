import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

export const fakeApi: HttpInterceptorFn = (req, next) => {

  let users = JSON.parse(localStorage.getItem('users') || '[]');

  // REGISTER
  if (req.url.endsWith('/register') && req.method === 'POST') {

    const newUser = req.body as any;

    const exists = users.find(
      (u: any) => u.username === newUser.username
    );

    if (exists) {
      return throwError(() => ({
        status: 400,
        message: 'User already exists'
      }));
    }

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    return of(
      new HttpResponse({
        status: 200,
        body: { message: 'Registration successful' }
      })
    ).pipe(delay(800));
  }

  // LOGIN 
  if (req.url.endsWith('/login') && req.method === 'POST') {

    const { username, password } = req.body as any;

    const user = users.find(
      (u: any) => u.username === username && u.password === password
    );

    if (!user) {
      return throwError(() => ({
        status: 401,
        message: 'Invalid credentials'
      }));
    }

    // FAKE TOKEN
    const fakeToken = 'jwt-token-123456';

    localStorage.setItem('token', fakeToken);

    return of(
      new HttpResponse({
        status: 200,
        body: {
          user,
          token: fakeToken
        }
      })
    ).pipe(delay(800));
  }

  return next(req);
};