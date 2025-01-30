import { Component, inject, Injectable, input } from '@angular/core'
import { User } from '../../_models/user'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { CommonModule } from '@angular/common'
import { MatDialog } from '@angular/material/dialog'
import { UploadPhotoComponent } from '../../_dialogs/upload-photo/upload-photo.component'
import { AccountService } from '../../_services/account.service'
import { TimeagoClock, TimeagoCustomFormatter, TimeagoDefaultClock, TimeagoFormatter, TimeagoIntl, TimeagoModule } from 'ngx-timeago'
import { strings as engString } from 'ngx-timeago/language-strings/en.js'
import { strings as japString } from 'ngx-timeago/language-strings/ja.js'

// @Injectable() // This is a decorator that marks a class as available to be provided and injected as a dependency.
// class MyIntl extends TimeagoIntl { }

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
  imports: [MatButtonModule, MatIconModule, MatCardModule, CommonModule, TimeagoModule],
  providers: [
    { provide: TimeagoIntl, useClass: TimeagoIntl },
    { provide: TimeagoFormatter, useClass: TimeagoCustomFormatter },
    { provide: TimeagoClock, useClass: TimeagoDefaultClock }
  ]
})

export class PhotoComponent {
  // intl = inject(TimeagoIntl)
  user = input.required<User>()

  constructor(private intl: TimeagoIntl) {
    // this.intl.strings = engString
    this.intl.strings = japString
    this.intl.changes.next()
  }

  private accountService = inject(AccountService)
  private dialog = inject(MatDialog)


  openAddPhotoDialog() {
    const ref = this.dialog.open(UploadPhotoComponent)
    ref.afterClosed().subscribe(async file => {
      await this.accountService.uploadPhoto(file)
    })
  }

  deletePhoto(photo_id: string) {
    this.accountService.deletePhoto(photo_id)
  }
  setAvatar(photo_id: string) {
    this.accountService.setAvatar(photo_id)
  }
}

