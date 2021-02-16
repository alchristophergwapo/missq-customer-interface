import { Injectable } from '@angular/core';
import Pusher from "pusher-js";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public push = Pusher.logToConsole = true;


  constructor() {
    var pusher = new Pusher('613fad3a31bf82b52dc3', {
      cluster: 'ap1',
      // encrypted: true,
    });
    // this.channel = pusher.subscribe('chat');

    this.channel = pusher.subscribe('my-channel');
    // this.channel.bind('my-event', function(data) {
    //   // alert(JSON.stringify(data));
    //   // alert('Received my-event with message: ' + data.message);
    // });
  }
  channel;

  public init() {
    return this.channel;
  }
}
