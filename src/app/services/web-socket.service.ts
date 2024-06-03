import { Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import { BehaviorSubject } from 'rxjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private stompClient: Client;
  private gameStateSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() {
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS('http://localhost:3000/loteria'),
      reconnectDelay: 5000,
      debug: (str) => console.log(str),
    });
  }

  joinGame(gameId: string) {
    this.stompClient.onConnect = (frame) => {
      console.log('Connected: ' + frame);
      this.stompClient.subscribe(`/topic/game-progress/${gameId}`, (message: Message) => {
        const gameState = JSON.parse(message.body);
        this.gameStateSubject.next(gameState);
        console.log(gameState);
      });
    };

    this.stompClient.activate();
  }

  sendGamePlay(gameId: string, gamePlay: any) {
    this.stompClient.publish({
      destination: `/appLoteria/game/${gameId}`,
      body: JSON.stringify(gamePlay),
    });
  }

  getGameState() {
    return this.gameStateSubject.asObservable();
  }

  disconnect() {
    if (this.stompClient) {
      this.stompClient.deactivate();
    }
  }
}
