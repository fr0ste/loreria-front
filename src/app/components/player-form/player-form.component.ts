import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-player-form',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './player-form.component.html',
  styleUrl: './player-form.component.css',
})

export class PlayerFormComponent {
  @Output() joinGame = new EventEmitter<string>();
  playerName: string = '';

  onSubmit() {
    this.joinGame.emit(this.playerName);
  }
}
