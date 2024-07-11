import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './services/guard/auth.guard';
import { FeedComponent } from "./pages/feed/feed.component";
import { MapComponent } from "./pages/map/map.component";
import { StatisticsComponent } from './pages/statistics/statistics.component';
import {ChatRoomComponent} from "./pages/chatroom/chatroom.component";
import {ChatRoomListComponent} from "./pages/chatroom-list/chatroom-list.component";

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'feed', component: FeedComponent,
    canActivate: [AuthGuard],
  },{
    path: 'chatroom/:id', component: ChatRoomComponent,
    canActivate: [AuthGuard],
  },{
    path: 'chatlist', component: ChatRoomListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'map', component: MapComponent,
    canActivate: [AuthGuard],
  },
  {
    // this requires Admin role
    path: 'statistics',
    component: StatisticsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
  },
  {
    path: '**',
    redirectTo: 'home',
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
