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
  @Input() gameId?: number; // Asegúrate de tener esta entrada para gameId
  @Output() joinGame = new EventEmitter<string>();
  playerName: string = '';

  onSubmit() {
    this.joinGame.emit(this.playerName);

  }
}
