import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';

const routes: Routes = [
  {
    path: 'user',
    children: [
      {
        path: '',
        component: ListComponent,
        pathMatch: 'full'
      },
      {
        path: 'create',
        component: UserCreateComponent
      },
      {
        path: ':id',
        component: UserDetailComponent
      },
      {
        path: ':id/edit',
        component: UserEditComponent
      }
    ]
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
}) export class UserRoutingModule {

}
