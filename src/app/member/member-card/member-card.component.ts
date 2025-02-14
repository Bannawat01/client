import { Component, inject, input, OnInit } from '@angular/core'
import { User } from '../../_models/user'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { LikeService } from '../../_services/like.service'
import { cacheManager } from '../../_helper/cache'
import { RouterLink } from '@angular/router'


@Component({
  selector: 'app-member-card',
  imports: [MatButtonModule, MatCardModule, RouterLink],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.scss'
})
export class MemberCardComponent implements OnInit {

  LikeService = inject(LikeService)
  member = input.required<User>()
  isFollowing = false

  ngOnInit(): void {
    const member = this.member()
    if (!member || !member.id) return
    this.isFollowing = this.LikeService.IsFollowingMember(member.id)
  }

  toggleLike() {
    const member = this.member()
    if (!member || !member.id) return
    this.isFollowing = this.LikeService.toggleLike(member.id)
    cacheManager.clear('all')
  }
}

