import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbActionsModule,
  NbSidebarModule,
  NbSidebarService,
  NbMenuModule,
  NbCardModule,
  NbToastrModule,
  NbIconModule,
  NbButtonModule,
  NbSpinnerModule,
  NbListModule,
  NbSearchModule, NbSearchService
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { BmLayoutComponent } from '../core/components/bm-layout/bm-layout.component';
import { OverallInformationComponent } from './overall-information/overall-information.component';
import {OverAllInformationState} from "./overall-information/overall-information.state";
import {NgxsModule} from "@ngxs/store";
import {AgGridModule} from "ag-grid-angular";
import { NotFoundComponent } from './not-found/not-found.component';
import {HttpClientModule} from "@angular/common/http";
import {MoviesComponent} from "src/app/information/movies/movies.component";
import {MoviesState} from "src/app/information/movies/movies.state";
import {PeopleComponent} from "src/app/information/people/people.component";
import {PeopleState} from "src/app/information/people/people.state";
import {environment} from "src/environments/environment";
import {ApiService} from "src/core/services/api.service";
import {DirectorsService} from "src/api/directors.service";
import {MoviesService} from "src/api/movies.service";
import {PeopleService} from "src/api/people.service";
import {RatingsService} from "src/api/ratings.service";
import {StarsService} from "src/api/stars.service";
import {MoviesCell} from "src/core/cell-renderers/movies.column.cell";


export const STATES = [
  OverAllInformationState,
  MoviesState,
  PeopleState,
]

export const CELL_RENDERERS = [
  MoviesCell,
]

export const COMPONENTS = [
  AppComponent,

  //components
  BmLayoutComponent,

  //overall information page
  OverallInformationComponent,

  //information page
  MoviesComponent,
  PeopleComponent,

  //404 not found page
  NotFoundComponent,
]

export const PROVIDERS = [
  NbSearchService,

  //Api services
  ApiService,
  DirectorsService,
  MoviesService,
  PeopleService,
  RatingsService,
  StarsService
]

export const NEBULAR_MODULES = [
  NbSidebarModule.forRoot(),
  NbToastrModule.forRoot(),
  NbLayoutModule,
  NbButtonModule,
  NbEvaIconsModule,
  NbActionsModule,
  NbMenuModule,
  NbCardModule,
  NbIconModule,
  NbSpinnerModule,
  NbListModule,
  AgGridModule,
  NbSearchModule,
  NbThemeModule.forRoot({name: 'bm-theme'}),
  NbMenuModule.forRoot(),
]
@NgModule({
  declarations: [
    COMPONENTS,
    ...CELL_RENDERERS
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxsModule.forRoot(STATES, {
      developmentMode: !environment.production,
    }),
    NEBULAR_MODULES,
  ],
  providers: PROVIDERS,
  exports: [
    ...CELL_RENDERERS,
    NEBULAR_MODULES,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
