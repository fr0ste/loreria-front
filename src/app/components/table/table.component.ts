import { NgFor } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { WebSocketService } from '../../services/web-socket.service';
import { WaitingComponent } from '../waiting/waiting.component';
import { WinnerComponentComponent } from '../winner-component/winner-component.component';
import { Cards, Game } from './../../models/games';
import { UriConstants } from '../../utils/uris.constants';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgFor, WaitingComponent, WinnerComponentComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  private apiService = inject(ApiService<{}>);
  gameId: string = '';
  username: string = '';
  gamesData!: Game;
  deckPlayer: Cards[] = [];
  amWinner: boolean = false;
  private gameSubscription!: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private webSocketService: WebSocketService,
    public dialog: MatDialog
  ) {}

  gameStatus!: String;

  ngOnInit(): void {
    this.gameId = this.route.snapshot.params['game'];
    this.username = this.route.snapshot.params['player'];

    console.log(this.gameStatus);

    this.webSocketService
      .joinGame(this.gameId)
      .then(() => {
        this.webSocketService.getGame(this.gameId).subscribe((game: Game) => {
          this.getGame();
          this.gameStatus = game.status;
          console.log('Initial game state:', game);
          this.listenerMessage();
        });
      })
      .catch((error) => {
        console.error('Failed to join game:', error);
      });
  }

  winner: boolean = true;

  getGame() {
    this.apiService
      .getService({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        url: UriConstants.BACK_HOST + '/game/' + this.gameId,
        data: {},
      })
      .subscribe({
        next: (response) => {
          this.gamesData = response;
          console.log('respuesta desde el tablero', this.gamesData);
          this.filterUsername();
        },
        error: (error) => {
          console.error('Detalles del error:', error.message);
        },
      });
  }

  nameWinner : string = '';
  filterUsername() {
    const players = this.gamesData.players;
    if (Array.isArray(players)) {
      for (const player of players) {
        if (this.username === player.username) {
          this.deckPlayer = Object.values(player.table.table); // Transformar objeto en array
          console.log('Deck:', this.deckPlayer);
        if(this.winner == player.winner){
          console.log("ganador : ", player.username , " , ", player.winner);
          this.nameWinner = player.username;
          this.router.navigate(['/winner', this.nameWinner]); // Redirigir a la ruta con el gameId
        }
         
          if (player.winning) {
            this.gameStatus = 'WINNING';
          }
          return;
        }
      }
      console.log('Username no encontrado:', this.username);
    } else {
      console.log('Players no es un array:', players);
    }
  }

  marcaCasilla(idCard: number) {
    const currentCard = this.gamesData.deck.cards[this.gamesData.deck.cards.length - 1];
    const clickedCard = this.deckPlayer[idCard];
    console.log('Current deck card:', currentCard);
    console.log('Clicked card:', clickedCard);
    console.log('Deck Player:', this.deckPlayer);
    console.log('Deck Cards:', this.gamesData.deck.cards);
    
    if (clickedCard && clickedCard.idCard === currentCard.idCard) {
      this.apiService
      .postService({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        url: UriConstants.BACK_HOST + '/game/updateCardState',
        data: {
          playerId: this.username,
          gameId: this.gameId,
          cardId: currentCard.idCard,

        },
      })
      .subscribe({
        next: (response) => {
          this.getGame();
          console.log(response);
          
        },
        error: (error) => {
          console.error('Detalles del error:', error.message);
        },
      });
    } else {
      console.log('Selected card does not match the current deck card');
    }
  }

  listenerMessage() {
    this.gameSubscription = this.webSocketService
      .getGameState()
      .subscribe((game: Game) => {
        if (game != null) {
          this.gameStatus = game.status;
          this.getGame();
          this.checkWinner();
        }

        console.log('status', this.gameStatus);
      });
  }

  updateCardState(
    gameId: string,
    playerId: string,
    cardId: number
  ): Observable<any> {
    return this.webSocketService.updateCardState(gameId,playerId,cardId);
  }

  checkWinner(){
    const players = this.gamesData.players;
    if (Array.isArray(players)) {
      for (const player of players) {
        if (this.username === player.username) {
          if(player.winner){
            this.amWinner = true;
          }
        }
      }
      console.log('Username no encontrado:', this.username);
    } else {
      console.log('Players no es un array:', players);
    }
  }
}
