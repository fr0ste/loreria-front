import { Component,EventEmitter, OnInit, Output, inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { HttpHeaders } from '@angular/common/http';
import { Games } from '../../models/games';
import { CardServerComponent } from '../card-server/card-server.component';
import { CommonModule } from '@angular/common'; // Importa CommonModule



@Component({
  selector: 'app-lobby-player',
  standalone: true,
  imports: [FormsModule, CardServerComponent, CommonModule],
  templateUrl: './lobby-player.component.html',
  styleUrl: './lobby-player.component.css'
})
export class LobbyPlayerComponent implements OnInit {
  games: Games[] = [];
  private apiService = inject(ApiService<{}>);
  
  @Output() joinGame = new EventEmitter<string>();
  playerName: string = '';

  onSubmit() {
    this.joinGame.emit(this.playerName);
  }

  ngOnInit(): void {
    this.getGames();
    
  }

  getGames():void{

    this.apiService
    .getListService({
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      url: `${"http://132.18.53.92:3000/game/games"}`,
      data: {},
    })
    .subscribe({
      next: (response) => {
        this.games=response
        console.log("response", this.games)
        // console.log(this.questionsPathologicalPersonData);
      },
      error: (error) => {
        console.error('Error en la autenticación:', error);
        console.error('Detalles del error:', error.message); // Agrega esta línea para más detalles

      },
    });



  } 

}
