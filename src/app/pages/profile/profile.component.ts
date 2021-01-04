import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Profile } from 'src/app/shared/classes/profile.model';
import { IOrder } from 'src/app/shared/interfaces/order.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  change: boolean = true;
  firstName: string;
  lastName: string;
  birth: string;
  email: string = JSON.parse(localStorage.getItem('user')).email;
  phone: string;
  adress: string;
  comments: string;
  image: string = JSON.parse(localStorage.getItem('user')).image;
  currentUser: any = null;
  orders: Array<IOrder> = JSON.parse(localStorage.getItem('user')).orders;

  check: boolean = false;
  checkSave: boolean = false;

  content: string = 'Changes were saved!';
  color: string = 'white';

  emptyfirstName: boolean = true;
  emptylastName: boolean = true;
  emptyBirth: boolean = true;
  emptyPhone: boolean = true;
  emptyAdress: boolean = true;

  regExpFirstName = /^[a-zA-Z]{1}[a-z]{1,19}?$/;
  regExpLastName = /^[a-zA-Z]{1}[a-z]{1,19}?$/;
  regExpBirth = /^[a-zA-Zа-юА-Ю0-9\.\ \-]{8,19}$/;
  regExpPhone = /^[0-9]{10}$/;
  regExpAdress = /^[a-zA-Z0-9\,\ ]{3,}$/;
  constructor(private authService: AuthService, private storage: AngularFireStorage, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUserData();
  }

  private getUserData(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.firstName = this.currentUser.firstName;
    this.lastName = this.currentUser.lastName;
    this.birth = this.currentUser.birth;
    this.phone = this.currentUser.phone;
    this.adress = this.currentUser.adress;
    this.orders = this.currentUser.orders;
    if (this.image) {
      this.image = this.currentUser.image;
    }
    else {
      this.image = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/1200px-User_font_awesome.svg.png";
    }
    if (this.firstName) {
      this.emptyfirstName = false;
    }
    else {
      this.emptyfirstName = true;
    }
    if (this.lastName) {
      this.emptylastName = false;
    }
    else {
      this.emptylastName = true;
    }
    if (this.birth) {
      this.emptyBirth = false;
    }
    else {
      this.emptyBirth = true;
    }
    if (this.phone) {
      this.emptyPhone = false;
    }
    else {
      this.emptyPhone = true;
    }
    if (this.adress) {
      this.emptyAdress = false;
    }
    else {
      this.emptyAdress = true;
    }
  }

  private updateLocal(data): void {
    const update = {
      ...this.currentUser,
      ...data
    }
    localStorage.setItem('user', JSON.stringify(update))
  }

  chooseItem(check: boolean): void {
    if (check) {
      this.change = true;
    }
    else {
      this.change = false;
    }
  }

  save(): void {
    if (this.firstName && this.lastName && this.birth && this.phone && this.adress) {
      this.check = false;
      this.currentUser = JSON.parse(localStorage.getItem('user'));
      const user = new Profile(this.email, this.firstName, this.lastName, this.birth, this.phone, this.adress, this.image, this.currentUser.orders);
      this.authService.updateUserData(this.currentUser.id, user);
      this.updateLocal(user);
      this.toastr.success('Changes were saved!', 'Success');
      this.checkSave = true;
      this.color = 'white';
      this.content = 'Changes were saved!';
      this.getUserData();
    }
    else {
      this.content = 'Fill all the fields!';
      this.color = 'red';
      this.checkSave = true;
    }
  }

  CheckFName(): boolean {
    return this.regExpFirstName.test(this.firstName);
  }

  CheckLName(): boolean {
    return this.regExpLastName.test(this.lastName);
  }

  CheckBirth(): boolean {
    return this.regExpBirth.test(this.birth);
  }

  CheckPhone(): boolean {
    return this.regExpPhone.test(this.phone);
  }

  CheckAdress(): boolean {
    return this.regExpAdress.test(this.adress);
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `images/${file.name}`;
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);

    task.then(image => {
      this.toastr.success('Photo added success!', 'Success');
      this.storage.ref(`images/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        this.image = url;
        this.save();
      });
    })
    .catch(err => {
      console.log(err); 
      this.toastr.error('Error!', 'Denied');
    });
  }

  edit(): void {
    this.emptyfirstName = false;
    this.emptylastName = false;
    this.emptyBirth = false;
    this.emptyPhone = false;
    this.emptyAdress = false;
    this.check = true;
    this.checkSave = false;
    this.color = 'white';
    this.content = 'Changes were saved!';
  }
}
