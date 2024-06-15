import { Cards, Game, Games } from './../../models/games';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { HttpHeaders } from '@angular/common/http';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgFor],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  private apiService = inject(ApiService<{}>);
  gameId: string = '';
  username: string = '';
  gamesData!: Games;
  deckPlayer: Cards[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.gameId = this.route.snapshot.params['game'];
    this.username = this.route.snapshot.params['player'];
    console.log('Game ID:', this.gameId);
    console.log('Username:', this.username);
    this.getGame();
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
}
