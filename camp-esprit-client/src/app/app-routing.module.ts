import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './services/guard/auth.guard';
import {FeedComponent} from "./pages/feed/feed.component";
import {MapComponent} from "./pages/map/map.component";

const routes: Routes = [
  {
    path: '',
    component: FeedComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'feed',component:FeedComponent
  },{
  path:'map',component:MapComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
