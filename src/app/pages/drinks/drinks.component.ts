import { Component, OnInit } from '@angular/core';
import { IDrink } from 'src/app/shared/interfaces/drink.interface';
import { DrinkService } from 'src/app/shared/services/drink.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.scss']
})
export class DrinksComponent implements OnInit {
  drinks: Array<IDrink> = [];
  randID: string;
  randImg: string;
  check: boolean = false;
  searchName: string;
  color: string = '#007e32';
  bgColor: string = 'transparent';
  i = null;
  constructor(private drinkService: DrinkService) { }

  ngOnInit(): void {
    this.getDrinks();
  }

  private getDrinks(): void {
    this.drinkService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.drinks = data;
      this.Random();
    });
  }

  private Random(): void {
    if(this.i == null){
      this.i = Math.ceil(Math.random() * this.drinks.length);
      this.randID = this.drinks[this.i].urlName;
      this.randImg = this.drinks[this.i].imageTitle;
    }
  }

  editStatus(): void {
    this.check = !this.check;
    if (this.check) {
      this.color = '#fff';
      this.bgColor = '#007e32';
    }
    else {
      this.color = '#007e32';
      this.bgColor = 'transparent';
    }
  }
}
