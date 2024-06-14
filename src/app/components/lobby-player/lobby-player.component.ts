  import { WebSocketService } from './../../services/web-socket.service';
  import { Component,EventEmitter, OnInit, Output, inject} from '@angular/core';
  import { FormsModule } from '@angular/forms';
  import { ApiService } from '../../services/api.service';
  import { HttpHeaders } from '@angular/common/http';
  import { Games } from '../../models/games';
  import { CardServerComponent } from '../card-server/card-server.component';
  import { CommonModule } from '@angular/common'; // Importa CommonModule
  import { Router } from '@angular/router';
import { ConnectRequest } from '../../services/models/connect.model';



  @Component({
    selector: 'app-lobby-player',
    standalone: true,
    imports: [FormsModule, CardServerComponent, CommonModule],
    templateUrl: './lobby-player.component.html',
    styleUrl: './lobby-player.component.css'
  })
  export class LobbyPlayerComponent implements OnInit {
    games: Games[] = [];
    url = "http://localhost:3000";
    private apiService = inject(ApiService<{}>);
    private webSocketService = inject(WebSocketService)
    
    @Output() joinGame = new EventEmitter<string>();
    playerName: string = '';

    onSubmit() {
      this.joinGame.emit(this.playerName);
    }

    ngOnInit(): void {
      this.getGames();
      
    }

    constructor(private router: Router) {}


    onJoinGame(eventData: { playerName: string, gameId: number }) {
      console.log('El jugador', eventData.playerName, 'se unió al juego con el ID', eventData.gameId);
      this.connectToGame({ gameId: eventData.gameId.toString(), player: {username: eventData.playerName} })
    }

    

    connectToGame(player:ConnectRequest){
      this.apiService
      .postService({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        url: this.url+`${"/game/connect"}`,
        data: player,
      })
      .subscribe({
        next: (response) => {
          this.games=response
          console.log("response", response.gameId, player.player.username)
          this.router.navigate(['table', response.gameId, player.player.username]);
        },
        error: (error) => {
          console.error('Error en la autenticación:', error);
          console.error('Detalles del error:', error.message); // Agrega esta línea para más detalles

        },
      });

    }


    getGames():void{

      this.apiService
      .getListService({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        url: this.url+`${"/game/games"}`,
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
