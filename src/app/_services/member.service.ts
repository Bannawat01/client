import { HttpClient } from '@angular/common/http'
import { inject, Injectable, signal } from '@angular/core'
import { environment } from '../../environments/environment'
import { default_paginator, Paginator, QueryPagination, UserQueryPagination } from '../_models/pagination'
import { User } from '../_models/user'
import { cacheManager } from '../_helper/cache'
import { parseQuery } from '../_helper/helper'

type dataCategory = 'members' | 'follower' | 'following' //todo: error edit members to member

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private http = inject(HttpClient)
  private url = environment.baseUrl + 'api/' //user //todo: if error

  paginator = signal<Paginator<QueryPagination, User>>(default_paginator)

  private getData(category: dataCategory) {
    const pagination = this.paginator().pagination

    //have cache
    let key = cacheManager.createKey(pagination)
    const cacheData = cacheManager.load(key, category)
    if (cacheData) {
      console.log(`load ${category} from cache`)
      this.paginator.set(cacheData)
      return
    }
    //get data from server
    console.log(`load ${category} from server 💽`)
    const url = this.url + 'user/' + parseQuery(pagination)
    console.log(url)

    this.http.get<Paginator<UserQueryPagination, User>>(url).subscribe({
      next: (res) => {
        key = cacheManager.createKey(pagination)
        cacheManager.save(key, category, res)
        this.paginator.set(res)
      }
    })
  }

  getMembers() {
    console.log('get members')
    this.getData('members')
  }
}
