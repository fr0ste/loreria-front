import { Cards, Game, Games } from './../../models/games';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { HttpHeaders } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { WebSocketService } from '../../services/web-socket.service';
import { WaitingComponent } from '../waiting/waiting.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgFor, WaitingComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  private apiService = inject(ApiService<{}>);
  gameId: string = '';
  username: string = '';
  gamesData!: Game;
  deckPlayer: Cards[] = [];
  private gameSubscription!: Subscription;

  constructor(private route: ActivatedRoute, private webSocketService: WebSocketService) {}

  gameStatus!: String;

  ngOnInit(): void {
    this.gameId = this.route.snapshot.params['game'];
    this.username = this.route.snapshot.params['player'];

    this.webSocketService.joinGame(this.gameId).then(() => {
      this.webSocketService.getGame(this.gameId).subscribe((game: Game) => {
        this.getGame();
        this.gameStatus =game.status;
        console.log('Initial game state:', game);
        this.listenerMessage();
      });
    
    }).catch((error) => {
      console.error('Failed to join game:', error);
    });
  }

  getGame() {
    this.apiService
      .getService({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        url: 'http://localhost:3000/game/' + this.gameId,
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

  filterUsername() {
    const players = this.gamesData.players;
    if (Array.isArray(players)) {
      for (const player of players) {
        if (this.username === player.username) {
          this.deckPlayer = Object.values(player.table.table); // Transformar objeto en array
          console.log('Deck:', this.deckPlayer);
          return;
        }
      }
      console.log('Username no encontrado:', this.username);
    } else {
      console.log('Players no es un array:', players);
    }
  }

  marcaCasilla(idCard: number) {
    console.log('Marca casilla:', idCard);
  }
  

  listenerMessage() {
    this.gameSubscription = this.webSocketService.getGameState().subscribe((game: Game) => {
      if(game != null){
        this.gameStatus = game.status;
      }

      console.log("status", this.gameStatus)
    });
  }
}
