import { Cards, Game, Games } from './../../models/games';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { HttpHeaders } from '@angular/common/http';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgFor ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnInit {
  private apiService = inject(ApiService<{}>);

  gameId: string = '';
  username: string = '';


  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.gameId = this.route.snapshot.params['game'];
    this.username = this.route.snapshot.params['player'];

    console.log('Game ID:', this.gameId);
    console.log('Username:', this.username);

    this.getGame();

  }

  gamesData !: Games;

  getGame() {
    this.apiService
      .getService({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        url: 'http://132.18.53.92:3000/game/' + this.gameId,
        data: {},
      })
      .subscribe({
        next: (response) => {
          this.gamesData = response;
          console.log('respuesta desde el tablero',this.gamesData);
          this.filterUsername();
        },
        error: (error) => {
          console.error('Detalles del error:', error.message); // Agrega esta línea para más detalles
        },
      });
  }

  deckPlayer!: Cards[];

  filterUsername() {
    for (const player of (this.gamesData.players as any)) {
      if (this.username === player.username) {
        this.deckPlayer = player.table.table;
        console.log('Username encontrado:', this.username);
        console.log(this.deckPlayer);
        return;
      }
    }  
    console.log('Username no encontrado:', this.username);
  }
}
