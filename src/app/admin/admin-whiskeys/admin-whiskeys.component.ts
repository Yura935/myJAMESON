import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { IWhiskey } from 'src/app/shared/interfaces/whiskey.interface';
import { WhiskeyService } from 'src/app/shared/services/whiskey.service';
import { map } from 'rxjs/operators';
import { Whiskey } from 'src/app/shared/classes/whiskey.model';
import { ToastrService } from 'ngx-toastr';

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
  whiskeyTitleImage: string;
  whiskeyBlogImage: string;
  aroma: string;
  taste: string;
  afterTaste: string = '';
  whiskeyWeight: string;
  whiskeyPrice: number;
  whiskeyVideoLink: string = '';
  editStatus: boolean = false;

  whiskeys: Array<IWhiskey> = [];

  uploadProgressTitle: Observable<number>;
  uploadProgressBlog: Observable<number>;
  constructor(private storage: AngularFireStorage, private whiskeyService: WhiskeyService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getWiskeys();
  }

  uploadFileTitle(event): void {
    const file = event.target.files[0];
    const filePath = `images/${file.name}`;
    const upload = this.storage.upload(filePath, file);
    this.uploadProgressTitle = upload.percentageChanges();
    upload.then(image => {
      this.storage.ref(`images/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        this.whiskeyTitleImage = url;
      });
      this.toastr.success('Order added!', 'Success');
    });
    upload.catch(err => {
      console.log(err);
      this.toastr.error('Error!', 'Denied');
    });
  }

  uploadFileBlog(event): void {
    const file = event.target.files[0];
    const filePath = `images/${file.name}`;
    const upload = this.storage.upload(filePath, file);
    this.uploadProgressBlog = upload.percentageChanges();
    upload.then(image => {
      this.storage.ref(`images/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        this.whiskeyBlogImage = url;
      });
      this.toastr.success('Order added!', 'Success');
    });
    upload.catch(err => {
      console.log(err);
      this.toastr.error('Error!', 'Denied');
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
      this.whiskeyTitleImage,
      this.whiskeyBlogImage,
      this.aroma,
      this.taste,
      this.afterTaste,
      this.whiskeyWeight,
      this.whiskeyPrice,
      this.whiskeyVideoLink
    );
    delete newProd.id;
    this.whiskeyService.create(newProd).then(() => {
      this.toastr.success('Created new product successfully!', 'Success');
    })
    .catch(err => {
        console.log(err); 
        this.toastr.error('Error!', 'Denied');
      });
    this.reset();
  }

  editProduct(whiskey: IWhiskey): void {
    this.whiskeyID = whiskey.id.toString();
    this.whiskeyName = whiskey.name;
    this.whiskeyUrlName = whiskey.urlName;
    this.whiskeyTitleDescription = whiskey.descriptionTitle;
    this.whiskeyDescription = whiskey.description;
    this.whiskeyTitleImage = whiskey.imageTitle;
    this.whiskeyBlogImage = whiskey.imageBlog;
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
        this.toastr.success('The product was delated successfully!', 'Success');
      })
      .catch(err => {
        console.log(err); 
        this.toastr.error('Error!', 'Denied');
      });
  }

  updateProduct(): void {
    const currentProd = new Whiskey(
      this.whiskeyID,
      this.whiskeyName,
      this.whiskeyUrlName,
      this.whiskeyTitleDescription,
      this.whiskeyDescription,
      this.whiskeyTitleImage,
      this.whiskeyBlogImage,
      this.aroma,
      this.taste,
      this.afterTaste,
      this.whiskeyWeight,
      this.whiskeyPrice,
      this.whiskeyVideoLink
    );
    delete currentProd.id;
    this.whiskeyService.update(this.whiskeyID.toString(), currentProd)
      .then(() => this.toastr.success('The product was updated successfully!', 'Success'))
      .catch(err => {
        console.log(err); 
        this.toastr.error('Error!', 'Denied');
      });
    this.editStatus = false;
    this.reset();
  }

  reset(): void {
    this.whiskeyID = '';
    this.whiskeyName = '';
    this.whiskeyUrlName = '';
    this.whiskeyTitleDescription = ''
    this.whiskeyDescription = '';
    this.whiskeyTitleImage = '';
    this.whiskeyBlogImage = '';
    this.aroma = '';
    this.taste = '';
    this.afterTaste = '';
    this.whiskeyWeight = '';
    this.whiskeyPrice = null;
    this.whiskeyVideoLink = '';
  }
}
