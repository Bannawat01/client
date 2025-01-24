import { HttpInterceptorFn } from '@angular/common/http'
import { AccountService } from '../_services/account.service'
import { inject } from '@angular/core'

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const accountServicd = inject(AccountService)
  if (accountServicd.data()?.token) {
    req = req.clone({
      setHeaders: {
        authorization: 'Bearer ' + accountServicd.data()?.token
      }
    })
  }
  return next(req)
}
