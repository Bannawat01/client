import { Component, inject, OnInit, WritableSignal } from '@angular/core'
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator'
import { MemberService } from '../_services/member.service'
import { default_pageSizeOption, default_paginator, Paginator, UserQueryPagination } from '../_models/pagination'
import { User } from '../_models/user'
import { MatExpansionModule } from '@angular/material/expansion'
import { FormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button'
import { MatSelectModule } from '@angular/material/select'
import { MatIcon } from '@angular/material/icon'
import { MemberCardComponent } from './member-card/member-card.component'


@Component({
  selector: 'app-member',
  imports: [MatInputModule, MatPaginatorModule, MatExpansionModule, MatInputModule, MatFormFieldModule, FormsModule, MatButtonModule, MatSelectModule, MatIcon, MemberCardComponent],
  templateUrl: './member.component.html',
  styleUrl: './member.component.scss'
})
export class MemberComponent implements OnInit {
  private memberService = inject(MemberService)
  paginator: WritableSignal<Paginator<UserQueryPagination, User>> //
  pageSize = default_pageSizeOption
  constructor() {
    this.paginator = this.memberService.paginator
  }
  ngOnInit(): void {
    this.memberService.getMembers()
  }

  onPageChange(event: PageEvent) {
    const coppyPaginator = this.paginator()
    coppyPaginator.pagination.currentPage = event.pageIndex + 1
    coppyPaginator.pagination.pageSize = event.pageSize
    this.paginator.set(coppyPaginator)

    this.onSearch()
  }

  onSearch() {
    this.memberService.getMembers()
  }

  onResetSearch() {
    this.paginator.set(default_paginator)
    this.onSearch()
  }
}

