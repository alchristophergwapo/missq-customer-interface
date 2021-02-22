import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { Storage } from '@ionic/storage';
import { AuthService } from '../services/auth.service';

import { HttpClient } from '@angular/common/http';
import { v4 } from 'uuid';

interface Message {
  id: string;
  text: string;
  timeStamp: Date;
  type: string;
  user: String;
}

@Component({
  selector: 'app-live-chat',
  templateUrl: './live-chat.page.html',
  styleUrls: ['./live-chat.page.scss'],
})

export class LiveChatPage implements OnInit {
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private chat: ChatService,
    private storage: Storage) { }

  public messages: Array<Message> = [];
  message: string = '';
  lastMessageId;
  userAccount: string = '';
  public currentUser;
  public image;
  public time = new Date();
  public fullTime = this.time.getHours() + ":" + this.time.getMinutes() + ":" + this.time.getSeconds();
  today = Date.now();

  sendMessage() {
    if (this.message !== '') {

      // Assign an id to each outgoing message. It aids in the process of differentiating between outgoing and incoming messages
      this.lastMessageId = v4();
      const data = {
        id: this.lastMessageId,
        text: this.message,
        timeStamp: this.fullTime,
        user: this.currentUser,
      };

      this.http
        .post(`http://3.137.219.17:8080/messages`, data)
        .subscribe((res: Message) => {
          const message = {
            ...res,
            // The message type is added to distinguish between incoming and outgoingmessages. It also aids with styling of each message type
            type: 'outgoing',
          };
          console.log(message);

          this.messages = this.messages.concat(message);
          this.message = '';
        });

      // console.log(data);
    }
  }

  // This method adds classes to the element based on the message type
  getClasses(messageType) {
    return {
      incoming: messageType === 'incoming',
      outgoing: messageType === 'outgoing',
    };
  }

  ngOnInit() {
    const channel = this.chat.init();
    channel.bind('message', (data) => {
      this.messages = data
    })

    this.account();

  }

  account() {
    this.storage.get('jwt-token').then(async res => {
      if (res) {
        this.userAccount = res.user;
        let name = this.userAccount['name'];
        let img = this.userAccount['picture'];
        this.currentUser = name;
        this.image = img;
        console.log(this.currentUser);

      }
    })
    this.allRecentMessages();

    // this.authService.getUser().then(res => {
    //   if (res) {
    //     this.currentUser = res.name;
    //     console.log(this.currentUser);
    //     return this.currentUser;
    //   } else {
    //     return null;
    //   }
    // });
    // this.allRecentMessages();

  }

  allRecentMessages() {
    this.authService.getAllMessages().subscribe((messages) => {
      console.log(messages);

      this.messages = messages
    })
  }
}