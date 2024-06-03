import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebSocketService } from '../../services/web-socket.service';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.css'
})

export class GameBoardComponent implements OnInit, OnDestroy {
  @Input() playerName!: string;
  @Input() gameId!: string;
  currentCard!: string;
  private gameStateSubscription!: Subscription;

  constructor(private webSocketService: WebSocketService) { }

  ngOnInit() {
    this.webSocketService.joinGame(this.gameId);
    this.gameStateSubscription = this.webSocketService.getGameState().subscribe(gameState => {
      if (gameState) {
        this.currentCard = gameState.currentCard;
      }
    });
  }

  ngOnDestroy() {
    this.webSocketService.disconnect();
    if (this.gameStateSubscription) {
      this.gameStateSubscription.unsubscribe();
    }
  }

  declareBingo() {
    this.webSocketService.sendGamePlay(this.gameId, {
      playerName: this.playerName,
      status: 'bingo'
    });
  }
}
