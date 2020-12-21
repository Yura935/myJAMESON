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
    let i = Math.round(Math.random() * this.drinks.length);
    console.log(i);
    if (i > 0) {
      if (i == this.drinks.length) {
        this.randID = this.drinks[i - 1].urlName;
        this.randImg = this.drinks[i - 1].imageTitle;
        console.log(this.randImg);

      }
      else {
        this.randID = this.drinks[i].urlName;
        this.randImg = this.drinks[i].imageTitle;
        console.log(this.randImg);
      }
    }
    else {
      i = 1;
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
