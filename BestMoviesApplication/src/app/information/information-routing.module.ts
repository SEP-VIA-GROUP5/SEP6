import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MoviesComponent} from "src/app/information/movies/movies.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full'
  },
  {
    path: 'movies',
    component: MoviesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformationRoutingModule {
}
