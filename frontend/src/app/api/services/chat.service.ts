import { Injectable } from '@angular/core';
import Pusher from "pusher-js";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor() {
    var pusher = new Pusher('9d4e34bbed57dbddf921', {
      cluster: 'ap1',
      // encrypted: true,
    });
    this.channel = pusher.subscribe('chat');
  }
  channel;

  public init() {
    return this.channel;
  }
}
