import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityOneComponent } from './activity-one/activity-one.component';
import { ActivityThreeComponent } from './activity-three/activity-three.component';
import { ActivityTwoComponent } from './activity-two/activity-two.component';
import { HomeComponent } from './home/home.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { LoginComponent } from './login/login.component';
import { MisclassifiedImagesComponent } from './misclassified-images/misclassified-images.component';
import { RecognizeBlightComponent } from './recognize-blight/recognize-blight.component';

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: 'home', component:HomeComponent},
  {path: 'activity-one', component:ActivityOneComponent},
  {path: 'leaderboard', component:LeaderboardComponent},
  {path: 'activity-two', component: ActivityTwoComponent},
  {path: 'recognize-blight', component: RecognizeBlightComponent},
  {path: 'activity-three', component: ActivityThreeComponent},
  {path: 'misclassified-images', component: MisclassifiedImagesComponent},
  {path:'', redirectTo:'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
