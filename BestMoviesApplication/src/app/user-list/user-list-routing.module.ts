import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list.component';
import { TopListComponent } from "src/app/user-list/top-list/top-list.component";
import { FavouriteListComponent } from "src/app/user-list/favourite-list/favourite-list.component";

const routes: Routes = [
  {
    path: '',
    component: UserListComponent
  },
  {
    path:'top',
    title: 'Top movies list',
    component: TopListComponent,
  },
  {
    path:'favourites',
    title: 'Favourite movies',
    component: FavouriteListComponent,
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserListRoutingModule { }
