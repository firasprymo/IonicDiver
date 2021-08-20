import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: { email: '', password: '' };
  constructor(private auth: AuthService) { }

  ngOnInit() {
  }
  signIn() {
    this.auth.login(this.user).subscribe(user => {
      console.log(user
      );

    })
  }
}
