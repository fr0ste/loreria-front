import { WebSocketService } from './../../services/web-socket.service';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from '../../models/games';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common'; 


@Component({
  selector: 'app-cantador-start',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './cantador-start.component.html',
  styleUrl: './cantador-start.component.css'
})
export class CantadorStartComponent {
  public maxPlayers: number = 4; // Puedes ajustar este valor o hacerlo configurable en la vista

  constructor(private webSocketService: WebSocketService, private router: Router) {}
/*
  createGame() {
    this.webSocketService.startGame(this.maxPlayers).subscribe((game: Game) => {
      console.log('Game created:', game);
      this.router.navigate(['cards', game.gameId]); // Redirigir a la vista del deck del juego
    });
  }
}*/
  createGame(form: NgForm) {
    if (form.valid) {
      this.webSocketService.startGame(this.maxPlayers).subscribe((game: Game) => {
        console.log('Game created:', game);
        this.router.navigate(['cards', game.gameId]);
      });
    }
  }
}