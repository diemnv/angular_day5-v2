import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../user.interface';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  formUser: FormGroup;
  user: User;
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.formUser = this.fb.group({
      id: ['', [Validators.required, Validators.minLength(2)]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.minLength(2)]],
      photo: ['', [Validators.required]]
    })

    this.activateRoute.paramMap.pipe(mergeMap(params => {
      const id = params.get('id');
      return this.http.get<User>(`http://localhost:3000/users/${id}`);
    })).subscribe(user => {
      this.user = user;
      this.formUser.patchValue(user);
    })

  }

  onSubmit() {
    if (this.formUser.valid) {
      const value = this.formUser.value;
      const u = {
        ...value
      }
      this.http.patch(`http://localhost:3000/users/${this.user.id}`, u).subscribe(() => {
        this.router.navigateByUrl('/user');
      });
    }
  }
}
