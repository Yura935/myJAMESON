import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDrink } from 'src/app/shared/interfaces/drink.interface';
import { DrinkService } from 'src/app/shared/services/drink.service';

@Component({
  selector: 'app-drink-details',
  templateUrl: './drink-details.component.html',
  styleUrls: ['./drink-details.component.scss']
})
export class DrinkDetailsComponent implements OnInit {
  view = null;
  activated: Array<any> = [];
  check: boolean = false;
  width: string;
  constructor(private drinkService: DrinkService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProduct();
  }

  private getProduct(): void {
    const name = this.activatedRoute.snapshot.paramMap.get('name');
    this.drinkService.getOne(name).onSnapshot(
      document => {
        document.forEach(prod => {
          const product = {
            id: prod.id,
            ...prod.data() as IDrink
          };
          this.view = product;
        });
      }
    );
  }

  productCount(drink: IDrink, status: boolean): void {
    if (status) {
      drink.count++;
    }
    else {
      if (drink.count > 1) {
        drink.count--;
      }
    }
  }
}
