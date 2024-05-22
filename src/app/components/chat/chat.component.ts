import { ChatService } from './../../services/chat.service';
import { ChatMessage } from './../../models/chat-message';
import { Component, OnInit, inject } from '@angular/core';
import { CompatClient, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
  FormsModule
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
  }

  public sendMessage() {
    const chatMessage = {
      message : this.messageInput,
      user: this.userId
    } as ChatMessage;


    this.chatService.sendMessage("ABC" , chatMessage);

    this.messageInput = "";

  }


}
