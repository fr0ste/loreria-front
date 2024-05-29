import { Injectable } from '@angular/core';
import { CompatClient, Stomp } from '@stomp/stompjs';
import { BehaviorSubject } from 'rxjs';
import SockJS from 'sockjs-client';
import { ChatMessage } from './../models/chat-message';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  /**
   * variables
   */
  private stompClient!: CompatClient;
  private messageSubject: BehaviorSubject<ChatMessage[]> = new BehaviorSubject<
    ChatMessage[]
  >([]);

  constructor() {
    this.initConnectionSocket();
  }

  initConnectionSocket() {
    const url = 'http://localhost:3000/chat';
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket);
  }

  joinRoom(roomId: String) {
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe(`/topic/${roomId}`, (messages: any) => {
        const messageContent = JSON.parse(messages.body);
        const currentMessage = this.messageSubject.getValue();

        currentMessage.push(messageContent);

        this.messageSubject.next(currentMessage);

        console.log(currentMessage);
      });
    });
  }

  sendMessage(roomId: String, chatMessage: ChatMessage) {
    //path del controller
    this.stompClient.send(
      `/appLoteria/chat/${roomId}`,
      {},
      JSON.stringify(chatMessage)
    );
  }

  getMessageSubject() {
    return this.messageSubject.asObservable();
  }
}
