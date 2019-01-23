import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { v4 as uuid } from 'uuid'
import { User } from '../user.interface';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      photo: ['', [Validators.required, Validators.minLength(2)]],
    })
  }
  onSubmit() {
    if (this.userForm.valid) {
      const value = this.userForm.value;
      const user: User = {
        id: uuid(),
        ...value
      };
      this.http.post('http://localhost:3000/users', user).subscribe(() => {
        this.router.navigateByUrl('/user');
      });
    }
  }
}
