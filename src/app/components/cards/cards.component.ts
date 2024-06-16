import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebSocketService } from '../../services/web-socket.service';
import { Game } from '../../models/games';
import { Subscription } from 'rxjs';
import { WaitingComponent } from '../waiting/waiting.component';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule, WaitingComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
})
export class CardsComponent implements OnInit, OnDestroy {
  gameId!: string;
  game!: Game;
  private gameSubscription!: Subscription;
  droppedCard: number | null = null;
  currentIndex = 0;
  gameStatus: string = "";

  constructor(
    private route: ActivatedRoute,
    private webSocketService: WebSocketService
  ) {}

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('id') || '';

    this.webSocketService.joinGame(this.gameId).then(() => {
      this.webSocketService.getGame(this.gameId).subscribe((game: Game) => {
        this.game = game;
        this.gameStatus =game.status;
        console.log('Initial game state:', game);
        this.initializeCards();
        this.listenerMessage();
      });
    
    }).catch((error) => {
      console.error('Failed to join game:', error);
    });
  }

  ngOnDestroy(): void {
    if (this.gameSubscription) {
      this.gameSubscription.unsubscribe();
    }
    this.webSocketService.disconnect();
  }

  listenerMessage() {
    this.gameSubscription = this.webSocketService.getGameState().subscribe((game: Game) => {
      if(game != null){
        this.gameStatus = game.status;
      }

      console.log("status", this.gameStatus)
    });
  }

  popCard() {
    this.webSocketService.popCard(this.gameId).subscribe((game) => {
      console.log('Card popped:', game);
    });
  }

  initializeCards() {
    let len = this.game.deck.cards.length;
    let left = -10;
    let s = 10;
    for (let i = len - 1; i >= 0; i--) {
      this.game.deck.cards[i].left = (left += 0) + 'px';
      this.game.deck.cards[i].zIndex = len - i;
    }
  }

  nextCardLoteria(index: number) {
    console.log('on next', this.game);
    this.popCard();
    this.droppedCard = index;
    setTimeout(() => {
      this.game.deck.cards.splice(index, 1);
      this.droppedCard = null;
      this.initializeCards();
    }, 500);
  }
}
