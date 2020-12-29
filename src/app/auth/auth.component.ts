import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  email: string;
  password: string;
  regExpEmail = /^[a-zA-Z0-9\-\.]{1,}@gmail\.com$/;
  regExpPass = /^[a-zA-Z0-9]{6,15}$/;
  borderLog: string = '1px solid transparent';
  borderPass: string = '1px solid transparent';

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  adminSignIn(): void {
    if (this.email && this.password) {
      if (this.regExpEmail.test(this.email)) {
        if (this.regExpPass.test(this.password)) {
          this.auth.signInAdmin(this.email, this.password);
          this.reset();
        }
        else {
          alert('Password is required!');
          this.borderLog = '1px solid transparent';
          this.borderPass = '1px solid red';
        }
      }
      else {
        alert('Valid email is required: ex@abc.xyz!');
        this.borderLog = '1px solid red';
        this.borderPass = '1px solid red';
      }
    }
    else {
      alert('Please fill in the fields!');
      this.borderLog = '1px solid red';
      this.borderPass = '1px solid red';
    }
  }

  reset(): void {
    this.borderLog = '1px solid transparent';
    this.borderPass = '1px solid transparent';
  }
}
