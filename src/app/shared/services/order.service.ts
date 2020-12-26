import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { IOrder } from '../interfaces/order.interface';
import { IWhiskey } from '../interfaces/whiskey.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  basket: Subject<Array<IWhiskey>> = new Subject<Array<IWhiskey>>();

  private dbPath = '/orders';
  private dbPathUsers = '/users';
  ordersRef: AngularFirestoreCollection<IOrder> = null;
  userRef: AngularFirestoreCollection<IOrder> = null;

  constructor(private db: AngularFirestore) {
    this.ordersRef = this.db.collection(this.dbPath);
    this.userRef = this.db.collection(this.dbPathUsers);
  }

  addBasket(whiskey: IWhiskey): void {
    let localProducts: Array<IWhiskey> = [];
    if (localStorage.getItem('basket')) {
      localProducts = JSON.parse(localStorage.getItem('basket'));
      if (localProducts.some(prod => prod.id === whiskey.id)) {
        const index = localProducts.findIndex(prod => prod.id === whiskey.id);
        localProducts[index].count += whiskey.count;
      }
      else {
        localProducts.push(whiskey);
      }
    }
    else {
      localProducts.push(whiskey);
    }
    localStorage.setItem('basket', JSON.stringify(localProducts));
    this.basket.next(localProducts);
  }

  getAll(): AngularFirestoreCollection<IOrder> {
    return this.ordersRef;
  }

  create(order: any): Promise<DocumentReference<IOrder>> {
    return this.ordersRef.add({ ...order });
  }

  update(id: string, data: any): Promise<void> {
    return this.userRef.doc(id).update({ ...data });
  }
}
