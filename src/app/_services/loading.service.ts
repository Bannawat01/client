import { inject, Injectable } from '@angular/core'
import { NgxSpinnerService } from 'ngx-spinner'

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loadingRequestsCount = 0

  private spinner = inject(NgxSpinnerService)
  constructor() {

  }

  loading() {
    this.loadingRequestsCount++
    this.spinner.show(undefined, {
      type: "fire",
      bdColor: 'rgba(100, 24, 215, 0.8)',
      color: 'rgba(0, 0, 0, 0.8)',
      fullScreen: false
    })
  }

  idle() {
    this.loadingRequestsCount--
    if (this.loadingRequestsCount < 0) {
      this.loadingRequestsCount = 0
      this.spinner.hide()
    }
  }
}
