import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { IWhiskey } from 'src/app/shared/interfaces/whiskey.interface';
import { WhiskeyService } from 'src/app/shared/services/whiskey.service';
import { map } from 'rxjs/operators';
import { Whiskey } from 'src/app/shared/classes/whiskey.model';

@Component({
  selector: 'app-admin-whiskeys',
  templateUrl: './admin-whiskeys.component.html',
  styleUrls: ['./admin-whiskeys.component.scss']
})
export class AdminWhiskeysComponent implements OnInit {
  whiskeyID: string;
  whiskeyName: string;
  whiskeyUrlName: string;
  whiskeyTitleDescription: string;
  whiskeyDescription: string;
  whiskeyImage: string;
  aroma: string;
  taste: string;
  afterTaste: string = '';
  whiskeyWeight: string;
  whiskeyPrice: number;
  whiskeyVideoLink: string = '';
  editStatus: boolean = false;

  whiskeys: Array<IWhiskey> = [];

  uploadProgress: Observable<number>;
  constructor(private storage: AngularFireStorage, private whiskeyService: WhiskeyService) { }

  ngOnInit(): void {
    this.getWiskeys();
  }

  uploadFile(event): void {
    const file = event.target.files[0];
    const filePath = `images/${file.name}`;
    const upload = this.storage.upload(filePath, file);
    this.uploadProgress = upload.percentageChanges();
    upload.then(image => {
      this.storage.ref(`images/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        this.whiskeyImage = url;
      });
      console.log('Photo added!');

    });
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

  addProduct(): void {
    const newProd = new Whiskey(
      1,
      this.whiskeyName,
      this.whiskeyUrlName,
      this.whiskeyTitleDescription,
      this.whiskeyDescription,
      this.whiskeyImage,
      this.aroma,
      this.taste,
      this.afterTaste,
      this.whiskeyWeight,
      this.whiskeyPrice,
      this.whiskeyVideoLink
    );
    delete newProd.id;
    this.whiskeyService.create(newProd).then(() => {
      console.log('Created new product successfully!');
    });
    this.reset();
  }

  editProduct(whiskey: IWhiskey): void {
    this.whiskeyID = whiskey.id.toString();
    this.whiskeyName = whiskey.name;
    this.whiskeyUrlName = whiskey.urlName;
    this.whiskeyTitleDescription = whiskey.descriptionTitle;
    this.whiskeyDescription = whiskey.description;
    this.whiskeyImage = whiskey.image;
    this.aroma = whiskey.aroma;
    this.taste = whiskey.taste;
    this.afterTaste = whiskey.afterTaste;
    this.whiskeyWeight = whiskey.weight;
    this.whiskeyPrice = whiskey.price;
    this.whiskeyVideoLink = whiskey.video;
    this.editStatus = true;
  }

  deleteProduct(whiskey: IWhiskey): void {
    this.whiskeyService.delete(whiskey.id.toString())
      .then(() => {
        console.log('The product was updated successfully!');
      })
      .catch(err => console.log(err));
  }

  updateProduct(): void {
    const currentProd = new Whiskey(
      this.whiskeyID,
      this.whiskeyName,
      this.whiskeyUrlName,
      this.whiskeyTitleDescription,
      this.whiskeyDescription,
      this.whiskeyImage,
      this.aroma,
      this.taste,
      this.afterTaste,
      this.whiskeyWeight,
      this.whiskeyPrice,
      this.whiskeyVideoLink
    );
    delete currentProd.id;
    this.whiskeyService.update(this.whiskeyID.toString(), currentProd)
      .then(() => console.log('The product was updated successfully!'))
      .catch(err => console.log(err));
    this.editStatus = false;
    this.reset();
  }

  reset(): void {
    this.whiskeyID = '';
    this.whiskeyName = '';
      this.whiskeyUrlName= '';
      this.whiskeyTitleDescription = ''
      this.whiskeyDescription = '';
      this.whiskeyImage = '';
      this.aroma = '';
      this.taste = '';
      this.afterTaste = '';
      this.whiskeyWeight = '';
      this.whiskeyPrice = null;
      this.whiskeyVideoLink = '';
  }

}
