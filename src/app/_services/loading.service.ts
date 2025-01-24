import { inject, Injectable } from '@angular/core'
import { NgxSpinnerService } from 'ngx-spinner'

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingCount = 0;

  private spinner = inject(NgxSpinnerService)


  loading() {
    this.loadingCount++
    console.log('Loading started, count:', this.loadingCount)
    this.spinner.show(undefined, {
      type: "fire",
      bdColor: 'rgba(100, 24, 215, 0.8)',
      color: 'rgba(0, 0, 0, 0.8)',
      fullScreen: false
    })
  }

  idle() {
    this.loadingCount = Math.max(0, this.loadingCount - 1)
    console.log('Loading stopped, count:', this.loadingCount)
    if (this.loadingCount === 0) {
      this.spinner.hide()
    }
  }
}
