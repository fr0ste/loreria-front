import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebSocketService } from '../../services/web-socket.service';
import { Game } from '../../models/games';
import { WaitingComponent } from '../waiting/waiting.component';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule, WaitingComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
})
export class CardsComponent implements OnInit {

  droppedCard: number | null = null;

  currentIndex = 0;

  public gameId!: string | null;

  game!: Game;

  gameStatus: any;

  constructor(
    private route: ActivatedRoute,
    private webSocketService: WebSocketService
  ) {}

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('id');
    this.listenerMessage();

    this.webSocketService.getGame(this.gameId || '').subscribe((game: Game) => {
      this.game = game;
      console.log('Game state:', game);
      this.webSocketService.joinGame(this.gameId || '');
      this.initializeCards();
      this.listenerMessage();
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
    this.popCard();
    this.droppedCard = index;
    setTimeout(() => {
      this.game.deck.cards.splice(index, 1);
      this.droppedCard = null;
      this.initializeCards();
    }, 500);
  }

  popCard() {
    this.webSocketService.popCard(this.gameId || '').subscribe((game) => {
      console.log('Card popped:', game);
    });
  }

  public listenerMessage() {
    this.webSocketService.getMessageSubject().subscribe((game: any) => {
      console.log('game listened: ', game);
      this.gameStatus = game.status
      console.log('gamestatus ', this.gameStatus);
    });
  }
}
