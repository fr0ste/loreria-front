import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import { BehaviorSubject, Observable } from 'rxjs';
import SockJS from 'sockjs-client';
import { Game } from '../models/games';
import { ConnectRequest } from './models/connect.model';
import { UriConstants } from '../utils/uris.constants';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private stompClient: Client;
  private gameStateSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private baseUrl = UriConstants.BACK_HOST+'/game';

  constructor(private http: HttpClient) {
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS(UriConstants.BACK_HOST + '/loteria'),
      reconnectDelay: 5000,
      debug: (str) => console.log(str),
    });
  }

  joinGame(gameId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.stompClient.onConnect = (frame) => {
        console.log('Connected: ' + frame);
        this.stompClient.subscribe(`/topic/game-progress/${gameId}`, (message: Message) => {
          const gameState = JSON.parse(message.body);
          this.gameStateSubject.next(gameState);
          console.log(gameState);
        });
        resolve();
      };

      this.stompClient.onStompError = (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
        reject(frame);
      };

      this.stompClient.activate();
    });
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

  startGame(maxPlayers: number): Observable<Game> {
    return this.http.post<Game>(`${this.baseUrl}/start`, { maxPlayers });
  }

  connectToGame(connectRequest: ConnectRequest): Observable<Game> {
    return this.http.post<Game>(`${this.baseUrl}/connect`, connectRequest);
  }

  popCard(gameId: string): Observable<Game> {
    return this.http.post<Game>(`${this.baseUrl}/pop-card/${gameId}`, {});
  }

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.baseUrl}/games`);
  }

  getGame(gameId: string): Observable<Game> {
    return this.http.get<Game>(`${this.baseUrl}/${gameId}`);
  }

  getMessageSubject() {
    return this.gameStateSubject.asObservable();
  }
}
