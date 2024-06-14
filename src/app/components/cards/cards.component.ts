import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebSocketService } from '../../services/web-socket.service';
import { Game } from '../../models/games';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
})
export class CardsComponent implements OnInit {
  droppedCard: number | null = null;

  currentIndex = 0;

  public gameId!: string | null;

  game!: Game;

  constructor(
    private route: ActivatedRoute,
    private webSocketService: WebSocketService
  ) {}

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('id');

    this.webSocketService.joinGame(this.gameId || '');

    this.webSocketService.getGame(this.gameId || '').subscribe((game: Game) => {
      this.game = game;
      console.log('Game state:', game);
      this.webSocketService.joinGame(this.gameId || '');
      this.initializeCards();
    });
    this.listenerMessage();
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
      //   this.messageList = messages.map((item: any) => ({
      //     ...item,
      //     message_side: item.user === this.userId ? 'sender' : 'reciver',
      //   }));
      console.log('game listened: ', game);
    });
    // console.log(this.messageList);
  }
}
