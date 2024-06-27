import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * Componente para representar una tarjeta de servidor de un juego.
 * Permite a los jugadores unirse a un juego especificado.
 * Desarrollado por Getzemani Alejandro Gonzalesz Cruz.
 */
@Component({
  selector: 'app-card-server',
  standalone: true, 
  imports: [FormsModule], 
  templateUrl: './card-server.component.html', 
  styleUrl: './card-server.component.css' 
})
export class CardServerComponent {
  @Input() gameId: number = 0; // Identificador único del juego al que unirse (entrada)
  @Output() joinGame = new EventEmitter<any>(); // Evento que se emite al unirse a un juego

  playerName: string = ''; // Nombre del jugador que se va a unir al juego

  /**
   * Método invocado al enviar el formulario de unirse al juego.
   * Emite un evento 'joinGame' con los datos del jugador y el ID del juego.
   */
  onSubmit() {
    this.joinGame.emit({ playerName: this.playerName, gameId: this.gameId });
  }
}
