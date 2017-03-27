import { Injectable} from '@angular/core';
import { Observable, Subject } from "rxjs/Rx";
import { AngularFireDatabase } from "angularfire2";

@Injectable()
export class MessagesService {

  constructor(private db: AngularFireDatabase) {}

  findAllMessages(): Observable<any> {
    return this.db.list('messages')
      .map(data => data);
  }

  addMessages(data: any) {
    return this.db.list('messages').push(data);
  }
}
