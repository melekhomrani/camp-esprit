import { Component, OnInit } from '@angular/core';
import { KeycloakOperationService } from 'src/app/services/keycloak/keycloak.service';
import { UserProfile } from 'src/app/services/keycloak/user-profile';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  resp: any;
  userProfile: UserProfile | undefined;

  constructor(
    private testService: TestService,
    private keyCloakService: KeycloakOperationService,
  ) { }

  ngOnInit() {
    this.getFromBackend();
    console.log(this.resp)
    this.keyCloakService.getUserProfile().then((data: any) => {
      this.userProfile = data;
      console.table(this.userProfile);
    });
  }

  getFromBackend() {
    this.testService.getFromBackend().subscribe(
      (res: any) => {
        this.resp = res;
      },
      (error: any) => {
        console.log(error.error);
      }
    );
  }


}
