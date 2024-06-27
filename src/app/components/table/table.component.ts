import { NgFor } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import {
  MatDialog
} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { WebSocketService } from '../../services/web-socket.service';
import { WaitingComponent } from '../waiting/waiting.component';
import { WinnerComponentComponent } from '../winner-component/winner-component.component';
import { Cards, Game } from './../../models/games';
import { UriConstants } from '../../utils/uris.constants';

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

  constructor(private route: ActivatedRoute, private webSocketService: WebSocketService, public dialog: MatDialog) {}

  gameStatus!: String;

  openDialog() {
    this.dialog.open(WinnerComponentComponent, {
    });
  }

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
        url: UriConstants.BACK_HOST +'/game/' + this.gameId,
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
          if(player.winning){
            this.gameStatus = "WINNING";
            this.openDialog();
            
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
    console.log('Marca casilla:', idCard);
  }

  
  listenerMessage() {
    this.gameSubscription = this.webSocketService.getGameState().subscribe((game: Game) => {
      if(game != null){
        this.gameStatus = game.status;
        this.getGame();
      }

      console.log("status", this.gameStatus)
    });
  }
}
