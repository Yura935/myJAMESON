import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  сlientWidth = window.innerWidth;
  videoWidth: string = '958';
  videoHeight: string = '520';
  videoLeft: string = '10%'

  count: number;

  constructor(private whiskeyService: WhiskeyService,
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.getProduct();
    this.getWidth();
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

  private getWidth(): void {
    if (this.сlientWidth < 1126) {
      this.videoWidth = '760';
      this.videoHeight = '520'
      this.videoLeft = '10%';
    }
    if (this.сlientWidth < 1020) {
      this.videoWidth = '700';
      this.videoHeight = '500'
      this.videoLeft = '9%';
    }
    if (this.сlientWidth < 961) {
      this.videoWidth = '680';
      this.videoHeight = '420'
      this.videoLeft = '10%';
    }
    if (this.сlientWidth < 840) {
      this.videoWidth = '640';
      this.videoHeight = '410'
      this.videoLeft = '3%';
    }
    if (this.сlientWidth < 754) {
      this.videoWidth = '560';
      this.videoHeight = '390'
      this.videoLeft = '0';
    }
    if (this.сlientWidth < 682) {
      this.videoWidth = '510';
      this.videoHeight = '390'
      this.videoLeft = '0';
    }
    if (this.сlientWidth < 606) {
      this.videoWidth = '470';
      this.videoHeight = '350'
      this.videoLeft = '0';
    }
    if (this.сlientWidth < 542) {
      this.videoWidth = '440';
      this.videoHeight = '330';
      this.videoLeft = '3%';
    }
    if (this.сlientWidth < 505) {
      this.videoWidth = '410';
      this.videoHeight = '300';
      this.videoLeft = '0';
    }
    if (this.сlientWidth < 420) {
      this.videoWidth = '340';
      this.videoHeight = '260';
      this.videoLeft = '0';
    }
    if (this.сlientWidth < 380) {
      this.videoWidth = '300';
      this.videoHeight = '240';
      this.videoLeft = '0';
    }
    if (this.сlientWidth < 322) {
      this.videoWidth = '250';
      this.videoHeight = '240';
      this.videoLeft = '0';
    }
    if (this.сlientWidth < 282) {
      this.videoWidth = '210';
      this.videoHeight = '220';
      this.videoLeft = '0';
    }
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

  changeCount(prod: IWhiskey): void {
    prod.count = this.count;
  }
}
