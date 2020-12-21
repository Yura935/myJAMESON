import { Component, OnInit } from '@angular/core';
import { IWhiskey } from 'src/app/shared/interfaces/whiskey.interface';
import { WhiskeyService } from 'src/app/shared/services/whiskey.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-whiskeys',
  templateUrl: './whiskeys.component.html',
  styleUrls: ['./whiskeys.component.scss']
})
export class WhiskeysComponent implements OnInit {

  whiskeys: Array<IWhiskey> = [];
  constructor(private whiskeyService: WhiskeyService) { }

  ngOnInit(): void {
    this.getWiskeys();
  }

  private getWiskeys(): void {
    this.whiskeyService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.whiskeys = data;
    });
  }
}
