import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user.interface';
import { HttpClient } from '@angular/common/http';

import { mergeMap } from 'rxjs/operators';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user: User;
  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    // this.activatedRoute.paramMap.subscribe(param => {
    //   const id = param.get('id');
    //   this.http.get<User>(`http://localhost:3000/users/${id}`).subscribe(user => this.user = user);
    // })
    this.activatedRoute.paramMap.pipe(mergeMap(params => {
      const id = params.get('id');
      return this.http.get<User>(`http://localhost:3000/users/${id}`);
    })).subscribe(user => {
      this.user = user;
    })
  }
}
