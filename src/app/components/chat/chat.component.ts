import { ChatService } from './../../services/chat.service';
import { ChatMessage } from './../../models/chat-message';
import { Component, OnInit, inject } from '@angular/core';
import { CompatClient, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
  FormsModule,
  NgFor,
  NgIf
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit{

  /**
   * variables
   */
  messageInput!: String;
  userId!: String;
  messageList: any[] = [];

  /**
   * inyeccion de dependencias
   */
  private chatService = inject(ChatService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
      this.chatService.joinRoom("ABC");

      this.userId = this.route.snapshot.params["userId"];

      this.listenerMessage();

      console.log("message list: ", this.messageList);
  }

  public sendMessage() {
    const chatMessage = {
      message : this.messageInput,
      user: this.userId
    } as ChatMessage;


    this.chatService.sendMessage("ABC" , chatMessage);

    this.messageInput = "";

  }

  public listenerMessage(){
    this.chatService.getMessageSubject().subscribe((messages: any ) => {
      this.messageList = messages.map((item: any) => ({
        ...item,
        message_side: item.user === this.userId ? 'sender' : 'reciver'
      }))
    });
    console.log(this.messageList);
  }


}
