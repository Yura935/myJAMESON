import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Drink } from 'src/app/shared/classes/drink.model';
import { IDrink } from 'src/app/shared/interfaces/drink.interface';
import { DrinkService } from 'src/app/shared/services/drink.service';

@Component({
  selector: 'app-admin-drinks',
  templateUrl: './admin-drinks.component.html',
  styleUrls: ['./admin-drinks.component.scss']
})
export class AdminDrinksComponent implements OnInit {
  topI: string = '-100%';
  topLgI: string = '-100%';
  bgI: string = 'transparent';
  topP: string = '-100%';
  topLgP: string = '-100%';
  bgP: string = 'transparent';

  ingredient: string;
  ingredientID: number;
  checkI: boolean = false;
  step: string;
  stepID: number;
  checkS: boolean = false;

  ingredients: Array<string> = [];
  preparation: Array<string> = [];

  drinkID: string;
  drinkName: string;
  drinkUrlName: string;
  drinkDescription: string;
  drinkTitleImage: string;
  drinkBlogImage: string;
  drinkWeight: string;
  drinkPrice: number;
  editStatus: boolean = false;

  drinks: Array<IDrink> = [];

  uploadProgressTitle: Observable<number>;
  uploadProgressBlog: Observable<number>;
  constructor(private storage: AngularFireStorage, private drinkService: DrinkService) { }

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
    });
  }

  addProduct(): void {
    const newProd = new Drink(
      1,
      this.drinkName,
      this.drinkUrlName,
      this.drinkDescription,
      this.drinkTitleImage,
      this.drinkBlogImage,
      this.ingredients,
      this.preparation,
      this.drinkWeight,
      this.drinkPrice
    );
    delete newProd.id;
    this.drinkService.create(newProd).then(() => {
      console.log('Created new product successfully!');
    });
    this.reset();
  }

  editProduct(drink: IDrink): void {
    this.drinkID = drink.id.toString();
    this.drinkName = drink.name;
    this.drinkUrlName = drink.urlName;
    this.drinkDescription = drink.description;
    this.drinkTitleImage = drink.imageTitle;
    this.drinkBlogImage = drink.imageBlog;
    this.ingredients = drink.ingredients;
    this.preparation = drink.preparation;
    this.drinkWeight = drink.weight;
    this.drinkPrice = drink.price;
    this.editStatus = true;
  }

  deleteProduct(drink: IDrink): void {
    this.drinkService.delete(drink.id.toString())
      .then(() => {
        console.log('The product was updated successfully!');
      })
      .catch(err => console.log(err));
  }

  updateProduct(): void {
    const currentProd = new Drink(
      this.drinkID,
      this.drinkName,
      this.drinkUrlName,
      this.drinkDescription,
      this.drinkTitleImage,
      this.drinkBlogImage,
      this.ingredients,
      this.preparation,
      this.drinkWeight,
      this.drinkPrice
    );
    delete currentProd.id;
    this.drinkService.update(this.drinkID.toString(), currentProd)
      .then(() => console.log('The product was updated successfully!'))
      .catch(err => console.log(err));
    this.editStatus = false;
    this.reset();
  }

  reset(): void {
    this.drinkName = '';
    this.drinkUrlName = '';
    this.drinkDescription = '';
    this.drinkTitleImage = '';
    this.drinkBlogImage = '';
    this.ingredients = [];
    this.preparation = [];
    this.drinkWeight = '';
    this.drinkPrice = null;
  }

  addIngredient(): void {
    this.ingredients.push(this.ingredient);
    this.ingredient = '';
    this.modalDel();
  }

  editIngredient(index: number): void {
    this.openModalIngredients();
    this.checkI = true;
    this.ingredientID = index;
    this.ingredient = this.ingredients[index];
  }

  updateIngredient(): void {
    this.ingredients[this.ingredientID] = this.ingredient;
    this.checkI = false;
    this.modalDel();
  }

  deleteIngredient(index: number): void {
    this.ingredients.splice(index, 1);
  }

  addPreparation(): void {
    this.preparation.push(this.step);
    this.step = '';
    this.modalDel();
  }

  editPreparation(index: number): void {
    this.openModalPreparations();
    this.checkS = true;
    this.stepID = index;
    this.step = this.preparation[index];
  }

  updatePreparation(): void {
    this.preparation[this.stepID] = this.step;
    this.checkS = false;
    this.modalDel();
  }

  deletePreparation(index: number): void {
    this.preparation.splice(index, 1);
  }

  openModalIngredients(): void {
    this.topI = '20%';
    this.topLgI = '0';
    this.bgI = 'rgba(0, 0, 0, .7)';
  }

  openModalPreparations(): void {
    this.topP = '20%';
    this.topLgP = '0';
    this.bgP = 'rgba(0, 0, 0, .7)';
  }

  modalDel(): void {
    this.topI = '-100%';
    this.topLgI = '-100%';
    this.bgI = 'transparent';
    this.topP = '-100%';
    this.topLgP = '-100%';
    this.bgP = 'transparent';
  }

  uploadFileTitle(event): void {
    const file = event.target.files[0];
    const filePath = `images/${file.name}`;
    const upload = this.storage.upload(filePath, file);
    this.uploadProgressTitle = upload.percentageChanges();
    upload.then(image => {
      this.storage.ref(`images/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        this.drinkTitleImage = url;
      });
      console.log('Photo added!');
    });
  }

  uploadFileBlog(event): void {
    const file = event.target.files[0];
    const filePath = `images/${file.name}`;
    const upload = this.storage.upload(filePath, file);
    this.uploadProgressBlog = upload.percentageChanges();
    upload.then(image => {
      this.storage.ref(`images/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        this.drinkBlogImage = url;
      });
      console.log('Photo added!');
    });
  }

}
