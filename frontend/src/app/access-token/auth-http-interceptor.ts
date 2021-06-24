import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.headers.get("skip-token")) {
      return next.handle(req);
    }

    const idToken = sessionStorage.getItem("auth-token");

    if (idToken) {
      const cloned = req.clone({
        headers: req.headers.set("x-access-token", idToken)
      });

      return next.handle(cloned);
    }
    else {
      return next.handle(req);
    }
  }
}