import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-card-server',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './card-server.component.html',
  styleUrl: './card-server.component.css'
})
export class CardServerComponent {
  @Input() gameId: number = 0; // Asegúrate de tener esta entrada para gameId
  @Output() joinGame = new EventEmitter<any>();
  playerName: string = '';

  onSubmit() {
    // Emite un objeto con ambos parámetros
    this.joinGame.emit({ playerName: this.playerName, gameId: this.gameId });
  }
}
