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
    TopBarComponent
  ],
  imports: [
    BrowserModule,
    DragulaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
