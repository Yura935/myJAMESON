import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { IDrink } from '../interfaces/drink.interface';

@Injectable({
  providedIn: 'root'
})
export class DrinkService {

  private dbPath = '/drinks';
  drinksRef: AngularFirestoreCollection<IDrink> = null;

  constructor(private db: AngularFirestore) {
    this.drinksRef = this.db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<IDrink> {
    return this.drinksRef;
  }

  getOne(name: string): any {
    return this.drinksRef.ref.where('urlName', '==', name);
  }

  create(drink: IDrink): any {
    return this.drinksRef.add({ ...drink });
  }

  update(id: string, data: any): Promise<void> {
    return this.drinksRef.doc(id).update({ ...data });
  }

  delete(id: string): Promise<void> {
    return this.drinksRef.doc(id).delete();
  }
}
