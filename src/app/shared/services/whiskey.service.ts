import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { IWhiskey } from '../interfaces/whiskey.interface';
@Injectable({
  providedIn: 'root'
})
export class WhiskeyService {

  private dbPath = '/whiskeys';
  whiskeysRef: AngularFirestoreCollection<IWhiskey> = null;

  constructor(private db: AngularFirestore) {
    this.whiskeysRef = this.db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<IWhiskey> {
    return this.whiskeysRef;
  }

  getOne(name: string): any {
    return this.whiskeysRef.ref.where('urlName', '==', name);
  }

  create(whiskey: IWhiskey): any {
    return this.whiskeysRef.add({ ...whiskey });
  }

  update(id: string, data: any): Promise<void> {
    return this.whiskeysRef.doc(id).update({ ...data });
  }

  delete(id: string): Promise<void> {
    return this.whiskeysRef.doc(id).delete();
  }
}
