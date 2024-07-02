import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { KeycloakService, KeycloakBearerInterceptor } from 'keycloak-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { initializeKeycloak } from './services/init/keycloak-init.factory';
import { FeedComponent } from './pages/feed/feed.component';
import { ThreadComponent } from './components/thread/thread.component';
import { PostThreadComponent } from './components/post-thread/post-thread.component';
import {FormsModule} from "@angular/forms";
import { MapComponent } from './pages/map/map.component';
import { PopupComponent } from './components/popup/popup.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FeedComponent,
    ThreadComponent,
    PostThreadComponent,
    MapComponent,
    PopupComponent,
    NavbarComponent,
    StatisticsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    KeycloakService,
    {
      provide: APP_INITIALIZER,
      deps: [KeycloakService],
      useFactory: initializeKeycloak,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KeycloakBearerInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
