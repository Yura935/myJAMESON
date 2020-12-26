import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Profile } from 'src/app/shared/classes/profile.model';
import { IOrder } from 'src/app/shared/interfaces/order.interface';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  change: boolean = true;

  name: string;
  email: string = JSON.parse(localStorage.getItem('user')).email;
  phone: string;
  adress: string;
  comments: string;
  image: string = JSON.parse(localStorage.getItem('user')).image;
  currentUser: any = null;
  orders: Array<IOrder> = JSON.parse(localStorage.getItem('user')).orders;

  check: boolean = false;

  constructor(private authService: AuthService, private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.getUserData();
  }

  private getUserData(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.name = this.currentUser.firstName;
    this.phone = this.currentUser.phone;
    this.adress = this.currentUser.adress;
    this.orders = this.currentUser.orders;
    if (this.image) {
      this.image = this.currentUser.image;
    }
    else {
      this.image = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/1200px-User_font_awesome.svg.png";
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
    this.check = false;
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    const user = new Profile(this.email, this.name, this.phone, this.adress, this.image, this.currentUser.orders);
    this.authService.updateUserData(this.currentUser.id, user);
    this.updateLocal(user);
    console.log("all's good");
    alert('Changes were saved!');
    this.getUserData();
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `images/${file.name}`;
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);

    task.then(image => {
      this.storage.ref(`images/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        this.image = url;
        console.log(url);
        this.save();
      });
    });
  }

  edit(): void {
    this.check = true;
  }
}
