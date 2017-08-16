import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TopBarComponent } from "./top-bar/top-bar.component";
import { AccountComponent } from "./account/account.component";
import { ContactComponent } from "./contact/contact.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DetailsComponent } from "./details/details.component";
import { EditDetailsComponent } from "./edit-details/edit-details.component";
import { ForgotComponent } from "./forgot/forgot.component";
import { HomeComponent } from "./home/home.component";
import { ListingComponent } from "./listing/listing.component";
import { LoginComponent } from "./login/login.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { ResultComponent } from "./result/result.component";
import { ReviewComponent } from "./review/review.component";
import { SearchResultsComponent } from "./search-results/search-results.component";


import { DragulaModule } from '../../node_modules/ng2-dragula/ng2-dragula';
import { ColumnComponent } from './column/column.component';
import { DashHousingComponent } from './dash-housing/dash-housing.component';
import { EmailActionsComponent } from './email-actions/email-actions.component';
import { InitialColumnComponent } from './initial-column/initial-column.component';
import { ProspectNoteComponent } from './prospect-note/prospect-note.component';
import { ReportsComponent } from './reports/reports.component';
import { HomePanelsComponent } from './home-panels/home-panels.component';
import { ProspectPageComponent } from './prospect-page/prospect-page.component';
import { DashSearchResultsComponent } from './dash-search-results/dash-search-results.component';
import { ProspectTileComponent } from './prospect-tile/prospect-tile.component';
import { TrashboxComponent } from './trashbox/trashbox.component';
import { FinalColumnComponent } from './final-column/final-column.component';
import { Routes, RouterModule } from "@angular/router";
import { StorageService } from "./storage.service";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'account', component: AccountComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'details', component: DetailsComponent },
  { path: 'edit-details', component: EditDetailsComponent },
  { path: 'forgot', component: ForgotComponent },
  { path: 'login', component: LoginComponent },
  { path: 'search-results', component: SearchResultsComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    ContactComponent,
    DashboardComponent,
    DetailsComponent,
    EditDetailsComponent,
    ForgotComponent,
    HomeComponent,
    ListingComponent,
    LoginComponent,
    NotFoundComponent,
    ResultComponent,
    ReviewComponent,
    SearchResultsComponent,
    TopBarComponent,
    ColumnComponent,
    DashHousingComponent,
    EmailActionsComponent,
    InitialColumnComponent,
    ProspectNoteComponent,
    ReportsComponent,
    HomePanelsComponent,
    ProspectPageComponent,
    DashSearchResultsComponent,
    ProspectTileComponent,
    TrashboxComponent,
    FinalColumnComponent
  ],
  imports: [
    BrowserModule,
    DragulaModule,
    RouterModule.forRoot(routes)
  ],
  providers: [StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
