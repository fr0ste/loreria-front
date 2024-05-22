import { Injectable } from '@angular/core';
import { CompatClient, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { ChatMessage } from '../models/chat-message';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor() {
    this.initConnectionSocket();
  }

  private stompClient!: CompatClient;

  initConnectionSocket() {
    const url = 'http://localhost:3000/chat';
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket);
  }

  joinRoom(roomId: String) {
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe(`/topic/${roomId}`, (messages: any) => {
        const messageContent = JSON.parse(messages.body);
        console.log('messageSended: ', messageContent);
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
}
