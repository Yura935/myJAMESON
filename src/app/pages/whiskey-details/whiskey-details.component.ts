import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { IWhiskey } from 'src/app/shared/interfaces/whiskey.interface';
import { OrderService } from 'src/app/shared/services/order.service';
import { WhiskeyService } from 'src/app/shared/services/whiskey.service';

@Component({
  selector: 'app-whiskey-details',
  templateUrl: './whiskey-details.component.html',
  styleUrls: ['./whiskey-details.component.scss']
})
export class WhiskeyDetailsComponent implements OnInit {
  view = null;
  display: string = 'none';
  play: string = 'block';
  videoUrl: string;

  constructor(private whiskeyService: WhiskeyService,
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.getProduct();
  }

  private getProduct(): void {
    const name = this.activatedRoute.snapshot.paramMap.get('name');
    this.whiskeyService.getOne(name).onSnapshot(
      document => {
        document.forEach(prod => {
          const product = {
            id: prod.id,
            ...prod.data() as IWhiskey
          };
          this.view = product;
          this.videoUrl = this.view.video;
          this.videoUrl = this.videoUrl.substring(17, this.videoUrl.length);
          console.log(this.videoUrl);

        });
      }
    );
  }

  productCount(whiskey: IWhiskey, status: boolean): void {
    if (status) {
      whiskey.count++;
    }
    else {
      if (whiskey.count > 1) {
        whiskey.count--;
      }
    }
  }

  addToBasket(whiskey: IWhiskey): void {
    console.log(whiskey);
    this.orderService.addBasket(whiskey);
    whiskey.count = 1;
  }
}
