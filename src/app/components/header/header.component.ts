import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/shared/interfaces/order.interface';
import { IWhiskey } from 'src/app/shared/interfaces/whiskey.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { ToastrService } from 'ngx-toastr';

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
  top: string = '-200%';
  topLg: string = '-200%';
  bg: string = 'transparent';
  onLine: boolean = false;
  admin: boolean = false;
  userEmail: string;
  userPass: string;
  userName: string;
  userPhone: string;
  userDate: string = new Date().toISOString().slice(0, 10);

  topLgOrder: string = '-200%';
  topOrder: string = '-200%';
  bgOrder: string = 'transparent';

  checkBasket: boolean = false;
  displayBasket: string = 'none';
  right: string = '-100%';

  basket: Array<IWhiskey> = [];
  totalPrice: number = 0;

  orders: Array<IOrder>;
  userAdress: string;
  userComment: string = '';
  currentUser: any;
  userOrder: any;

  topOut: string = '-200%';
  topLgOut: string = '-200%';
  bgOut: string = 'transparent';

  regExpName = /^[a-zA-Z]{1}[a-z]{1,19}?$/;
  regExpPhone = /^[0-9\+]{10,13}$/;
  regExpEmail = /^[a-zA-Z0-9\-\.]{1,}@gmail\.com|org\.ua|ukr\.net|meta\.ua|hotmail\.com|ex\.mail|lpnu\.ua$/;
  regExpPass = /^[a-zA-Z0-9]{6,15}$/;
  regExpAdress = /^[a-zA-Z0-9\,\ ]{3,}$/;
  borderColorLog: string = 'salmon';
  borderColorPass: string = 'salmon';
  borderColorPhone: string = 'salmon';
  borderColorName: string = 'salmon';
  borderColorAdress: string = 'salmon';

  count: number;
  constructor(private authService: AuthService, private orderService: OrderService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getLocalProducts();
    this.checkMyBasket();
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
    if (this.sign == 'Sign UP') {
      this.sign = 'Sign IN';
    }
    else {
      this.sign == 'Sign UP'
    }
    this.checkLog = !this.checkLog;
    this.borderColorLog = 'salmon';
    this.borderColorPass = 'salmon';
    this.borderColorPhone = 'salmon';
    this.borderColorName = 'salmon';
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

  openOrderModal(): void {
    this.topOrder = '5%';
    this.topLgOrder = '0';
    this.bgOrder = 'rgba(0, 0, 0, .7)';
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.userName = this.currentUser.firstName;
    this.userPhone = this.currentUser.phone;
    this.userAdress = this.currentUser.adress;
  }

  openOutModal(): void {
    this.topLgOut = '0';
    this.topOut = '50%';
    this.bgOut = 'rgba(0, 0, 0, .7)';
    this.modalDel();
  }

  closeOutModal(): void {
    this.topLgOut = '-200%';
    this.topOut = '-200%';
    this.bgOut = 'transparent';
    this.modalDel();
  }

  modalDel(): void {
    this.top = '-200%';
    this.topLg = '-200%';
    this.bg = 'transparent';
    this.left = '-100%';
    this.transformB1 = 'rotate(0) translate(0,0)';
    this.opacity = '1';
    this.transformB3 = 'rotate(0) translate(0,0)';
    this.topOrder = '-200%';
    this.topLgOrder = '-200%';
    this.bgOrder = 'transparent';
    this.closeBasket();
    this.checkLog = true;
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

  private checkMyBasket(): void {
    this.orderService.basket.subscribe(
      data => {
        this.basket = data;
        this.totalPrice = this.getTotal(this.basket);
        this.checkBasket = true;
      }
    )
  }

  private getLocalProducts(): void {
    if (localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket'));
      this.totalPrice = this.getTotal(this.basket);
      if (this.basket.length > 0) {
        this.checkBasket = true;
      }
      else {
        this.checkBasket = false;
      }
    }
  }

  private getTotal(whiskeys: Array<IWhiskey>): number {
    return whiskeys.reduce((total, prod) => total + (prod.price * prod.count), 0);
  }

  productCount(whiskey: IWhiskey, status: boolean): void {
    if (status) {
      if(whiskey.count < 9){
        whiskey.count++;
      }
    }
    else {
      if (whiskey.count > 1) {
        whiskey.count--;
      }
    }
    this.totalPrice = this.getTotal(this.basket);
    this.orderService.basket.next(this.basket);
    localStorage.setItem('basket', JSON.stringify(this.basket));
  }

  removeProduct(whiskey: IWhiskey): void {
    if (confirm('Are you sure?')) {
      const index = this.basket.findIndex(prod => prod.id === whiskey.id)
      this.basket.splice(index, 1);
      this.totalPrice = this.getTotal(this.basket);
      this.orderService.basket.next(this.basket);
      localStorage.setItem('basket', JSON.stringify(this.basket));
      if (this.basket.length > 0) {
        this.checkBasket = true;
      }
      else {
        this.checkBasket = false;
      }
    }
  }

  addOrder(): void {
    if (this.userName, this.userPhone, this.userAdress) {
      if (this.regExpName.test(this.userName)) {
        if (this.regExpPhone.test(this.userPhone)) {
          if (this.regExpAdress.test(this.userAdress)) {
            if (this.basket.length > 0) {
              this.userOrder =
              {
                products: this.basket,
                firstName: this.userName,
                adress: this.userAdress,
                price: this.totalPrice,
                comments: this.userComment,
                date: this.userDate
              };
              this.orderService.create(this.userOrder)
                .then(
                  () => {
                    this.checkBasket = false;
                    console.log('Order added!');
                  }
                )
              if (localStorage.getItem('user')) {
                this.currentUser = JSON.parse(localStorage.getItem('user'));
                console.log(this.currentUser.orders);
                if (typeof this.currentUser.orders != 'undefined') {
                  this.currentUser.orders.push(this.userOrder);
                  console.log(this.currentUser.orders);
                }
                else {
                  this.currentUser.orders = [];
                  this.currentUser.orders.push(this.userOrder);
                }
                localStorage.setItem('user', JSON.stringify(this.currentUser));
                this.toastr.success('Order added!', 'Success');
                this.modalDel();
                this.orderService.update(this.currentUser.id, this.currentUser).then(
                  () => {
                    this.basket = [];
                    localStorage.removeItem('basket');
                    this.orderService.basket.next(this.basket);
                    this.totalPrice = 0;
                    this.reset();
                  }
                )
              }
              else {
                this.toastr.error('Error!', 'Denied');
                this.orderService.create(this.userOrder).then(
                  () => {
                    this.basket = [];
                    localStorage.removeItem('basket');
                    this.orderService.basket.next(this.basket);
                    this.totalPrice = 0;
                    this.checkBasket = false;
                    this.reset();
                  });
                this.modalDel();
              }
            }
          }
          else {
            alert('Your adress is incorrect. Correct the error and try again!');
            this.borderColorPhone = 'salmon';
            this.borderColorAdress = 'red';
            this.borderColorName = 'salmon';
          }
        }
        else {
          alert('Your phone is incorrect. Correct the error and try again!');
          this.borderColorPhone = 'red';
          this.borderColorName = 'salmon';
          if (this.regExpAdress.test(this.userAdress)) {
            this.borderColorAdress = 'salmon';
          }
          else {
            this.borderColorAdress = 'red';
          }
        }
      }
      else {
        alert('Your name is incorrect. Correct the error and try again!');
        this.borderColorName = 'red';
        if (this.regExpPhone.test(this.userPhone)) {
          this.borderColorPhone = 'salmon';
          if (this.regExpAdress.test(this.userAdress)) {
            this.borderColorAdress = 'salmon';
          }
          else {
            this.borderColorAdress = 'red';
          }
        }
        else {
          this.borderColorPhone = 'red';
          if (this.regExpAdress.test(this.userAdress)) {
            this.borderColorAdress = 'salmon';
          }
          else {
            this.borderColorAdress = 'red';
          }
        }
      }
    }
    else {
      alert('Please fill in the fields!');
      this.borderColorPhone = 'red';
      this.borderColorAdress = 'red';
      this.borderColorName = 'red';
    }
  }

  signUp(): void {
    if (this.userEmail && this.userPass && this.userName && this.userPhone) {
      if (this.regExpEmail.test(this.userEmail)) {
        if (this.regExpPass.test(this.userPass)) {
          if (this.regExpName.test(this.userName)) {
            if (this.regExpPhone.test(this.userPhone)) {
              this.authService.signUp(this.userEmail, this.userPass, this.userName, this.userPhone);
              this.onLine = true;
              this.reset();
              this.modalDel();
            }
            else {
              alert('Your phone is incorrect. Correct the error and try again!');
              this.borderColorPhone = 'red';
              this.borderColorLog = 'salmon';
              this.borderColorPass = 'salmon';
              this.borderColorName = 'salmon';
            }
          }
          else {
            alert('Your name is incorrect. Correct the error and try again!');
            this.borderColorLog = 'salmon';
            this.borderColorPass = 'salmon';
            this.borderColorName = 'red';
            this.borderColorPhone = 'red';
          }
        }
        else {
          alert('Your password is incorrect. Correct the error and try again!');
          this.borderColorLog = 'salmon';
          this.borderColorPass = 'red';
          this.borderColorName = 'red';
          this.borderColorPhone = 'red';
        }
      }
      else {
        alert('Your login is incorrect. Correct the error and try again!');
        this.borderColorLog = 'red';
        this.borderColorPass = 'red';
        this.borderColorName = 'red';
        this.borderColorPhone = 'red';
      }
    }
    else {
      alert('Please fill in all fields!');
      this.borderColorLog = 'red';
      this.borderColorPass = 'red';
      this.borderColorName = 'red';
      this.borderColorPhone = 'red';
    }
  }
  signIn(): void {
    if (this.userEmail && this.userPass) {
      if (this.regExpEmail.test(this.userEmail)) {
        if (this.regExpPass.test(this.userPass)) {
          this.authService.signIn(this.userEmail, this.userPass)
          if (this.userEmail == 'admin@gmail.com') {
            this.reset();
            this.modalDel();
          }
          else {
            this.reset();
            this.modalDel();
          }
        }
        else {
          alert('Your password is incorrect. Correct the error and try again!');
          this.borderColorPass = 'red';
        }
      }
      else {
        alert('Your email is incorrect. Correct the error and try again!');
        this.borderColorLog = 'red';
      }
    }
    else {
      alert('Please fill in the fields!');
      this.borderColorLog = 'red';
      this.borderColorPass = 'red';
    }
  }

  signOut(): void {
    this.authService.signOut();
    this.admin = false;
    this.onLine = false;
    this.totalPrice = 0;
    this.closeOutModal();
    this.reset();
  }

  reset(): void {
    this.userEmail = '';
    this.userPass = '';
    this.userName = '';
    this.userPhone = '';
    this.userAdress = '';
    this.userComment = '';
    this.totalPrice = 0;
    this.borderColorLog = 'salmon';
    this.borderColorPass = 'salmon';
    this.borderColorPhone = 'salmon';
    this.borderColorName = 'salmon';
    this.borderColorAdress = 'salmon';
    this.checkBasket = false;
  }

  goToBasket(): void {
    this.right = '0';
    this.checkMyBasket();
    this.getLocalProducts();
  }

  closeBasket(): void {
    this.right = '-100%';
  }
}