import { Component, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-winner-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './winner-component.component.html',
  styleUrl: './winner-component.component.css'
})
export class WinnerComponentComponent {

  @Input() gameId: number = 0; // Asegúrate de tener esta entrada para gameId
  playerName: string = '';

}
