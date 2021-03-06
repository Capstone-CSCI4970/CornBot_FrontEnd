import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { NgxChartsModule }from '@swimlane/ngx-charts';


import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ActivityOneComponent } from './activity-one/activity-one.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { ActivityTwoComponent } from './activity-two/activity-two.component';
import { ActivityThreeComponent } from './activity-three/activity-three.component';
import { RecognizeBlightComponent } from './recognize-blight/recognize-blight.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MisclassifiedImagesComponent } from './misclassified-images/misclassified-images.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    LoginComponent,
    HomeComponent,
    ActivityOneComponent,
    LeaderboardComponent,
    ActivityTwoComponent,
    ActivityThreeComponent,
    RecognizeBlightComponent,
    MisclassifiedImagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule, 
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule, 
    MatRadioModule, 
    MatTableModule, 
    MatSortModule, 
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
    NgxChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
