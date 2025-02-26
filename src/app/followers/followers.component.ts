import { Component, inject, OnInit, WritableSignal } from '@angular/core'
import { default_pageSizeOption, default_paginator, Paginator, UserQueryPagination } from '../_models/pagination'
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator'
import { User } from '../_models/user'
import { LikeService } from '../_services/like.service'
import { FormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIcon } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { MemberCardComponent } from '../member/member-card/member-card.component'

@Component({
  selector: 'app-followers',
  imports: [MemberCardComponent, MatIcon, MatSelectModule, MatButtonModule, MatPaginatorModule, MatExpansionModule, FormsModule, MatInputModule, MatFormFieldModule],
  templateUrl: './followers.component.html',
  styleUrl: './followers.component.scss'
})
export class FollowersComponent implements OnInit {
  private likeService = inject(LikeService)
  followers: WritableSignal<Paginator<UserQueryPagination, User>>
  pageSize = default_pageSizeOption
  constructor() {
    this.followers = this.likeService.followers
  }

  async onSearch() {
    this.likeService.getFollowers()
  }

  ngOnInit(): void {
    this.onSearch()
  }

  onResetSearch() {
    this.followers.set(default_paginator)
    this.onSearch()
  }

  onPageChange(event: PageEvent) {
    const copyPaginator = this.followers()
    copyPaginator.pagination.currentPage = event.pageIndex + 1
    copyPaginator.pagination.pageSize = event.pageSize
    this.followers.set(copyPaginator)

    this.onSearch()

  }
}