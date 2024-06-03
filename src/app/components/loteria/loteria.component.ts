import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { PlayerFormComponent } from '../player-form/player-form.component';
import { GameBoardComponent } from '../game-board/game-board.component';

@Component({
  selector: 'app-loteria',
  standalone: true,
  imports: [
    PlayerFormComponent,
    GameBoardComponent
  ],
  templateUrl: './loteria.component.html',
  styleUrl: './loteria.component.css'
})
export class LoteriaComponent {
  playerName!: string;
  gameId!: string;

  constructor(private http: HttpClient) { }

  handleJoinGame(playerName: string) {
    this.playerName = playerName;

    // Llamada al backend para crear o unirse a un juego y obtener gameId
    this.http.post<any>('http://localhost:3000/game/start', { name: playerName }).subscribe(response => {
      this.gameId = response.gameId;
    });
  }
}
