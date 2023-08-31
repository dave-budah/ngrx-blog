import {HttpInterceptorFn} from "@angular/common/http";
import {inject} from "@angular/core";
import {PersistenceService} from "../services/persistence.service";

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const persistenceService = inject(PersistenceService)
  const token = persistenceService.get('accessToken')
  request = request.clone({
    setHeaders: {
      // Token can be renamed to Bearer depending on the token passed
      Authorization: token ? `Token ${token}` : '',
    }
  })
  return next(request)
}
