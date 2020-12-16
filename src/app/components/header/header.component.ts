import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  check: boolean = false;
  left: string = '-100%';
  transformB1: string = '0';
  opacity: string = '1';
  transformB3: string = '0';
  checkLog: boolean = true;
  sign: string = 'Sign UP';
  top: string = '-100%';
  topLg: string = '-100%';
  bg: string = 'transparent';
  onLine: boolean = false;
  admin: boolean = false;
  userEmail: string;
  userPass: string;
  userName: string;
  userPhone: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.checkLocalUser();
    this.checkUserLogin();
  }

  getCollapse(): void {
    if (this.check) {
      this.left = '-100%';
      this.transformB1 = 'rotate(0) translate(0,0)';
      this.opacity = '1';
      this.transformB3 = 'rotate(0) translate(0,0)';
    }
    else {
      this.left = '0';
      this.transformB1 = 'rotate(-45deg) translate(-5px, 5px)';
      this.opacity = '0';
      this.transformB3 = 'rotate(45deg) translate(-8px, -8px)';
    }
    this.check = !this.check;
  }

  changeLog(): void {
    if(this.sign == 'Sign UP'){
      this.sign = 'Sign IN';
    }
    else{
      this.sign == 'Sign UP'
    }
    this.checkLog = !this.checkLog;
  }

  openModal(): void {
    this.top = '20%';
    this.topLg = '0';
    this.bg = 'rgba(0, 0, 0, .7)';
    this.left = '-100%';
    this.transformB1 = 'rotate(0) translate(0,0)';
    this.opacity = '1';
    this.transformB3 = 'rotate(0) translate(0,0)';
    this.check = !this.check;
  }

  modalDel(): void {
    this.top = '-100%';
    this.topLg = '-100%';
    this.bg = 'transparent';
  }

  private checkLocalUser(): void {
    if (localStorage.getItem('user')) {
      if (JSON.parse(localStorage.getItem('user')).role == 'user') {
        this.onLine = true;
      }
      else {
        this.admin = true;
      }
    }
    else {
      this.admin = false;
      this.onLine = false;
    }
  }

  private checkUserLogin(): void {
    this.authService.checkSignIn.subscribe(() => {
      this.checkLocalUser();
    });
  }


  signUp(): void {
    if(this.userEmail && this.userPass && this.userName && this.userPhone){
      this.authService.signUp(this.userEmail, this.userPass, this.userName, this.userPhone);
      this.reset();
      this.modalDel();
    }
  }

  signIn(): void {
    if (this.userEmail && this.userPass) {
      this.authService.signIn(this.userEmail, this.userPass)
      if (this.userEmail == 'admin@gmail.com') {
        this.admin = true;
        this.reset();
        this.modalDel();
      }
      else {
        this.onLine = true;
        this.reset();
        this.modalDel();
      }
    }
  }

  signOut(): void {
    this.authService.signOut();
    this.admin = false;
    this.onLine = false;
    this.reset();
  }

  reset(): void{
    this.userEmail = '';
    this.userPass = '';
    this.userName = '';
    this.userPhone = '';
  }

}
