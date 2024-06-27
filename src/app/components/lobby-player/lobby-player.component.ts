import { WebSocketService } from './../../services/web-socket.service'; 
import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core'; 
import { FormsModule } from '@angular/forms'; 
import { ApiService } from '../../services/api.service'; 
import { HttpHeaders } from '@angular/common/http'; 
import { Games } from '../../models/games'; 
import { CardServerComponent } from '../card-server/card-server.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 
import { ConnectRequest } from '../../services/models/connect.model'; 
import { UriConstants } from '../../utils/uris.constants'; 

// Componente para el lobby del jugador
//Desarrollado por Getzemani Alejandro Gonzalesz Cruz.

@Component({
  selector: 'app-lobby-player',
  standalone: true,
  imports: [FormsModule, CardServerComponent, CommonModule], 
  templateUrl: './lobby-player.component.html',
  styleUrl: './lobby-player.component.css' 
})
export class LobbyPlayerComponent implements OnInit {
  games: Games[] = []; // Arreglo para almacenar los juegos disponibles
  url = UriConstants.BACK_HOST; // URL del servidor backend
  private apiService = inject(ApiService<{}>); // Servicio de API para las llamadas HTTP
  private webSocketService = inject(WebSocketService); // Servicio de WebSocket para la comunicación en tiempo real
  
  @Output() joinGame = new EventEmitter<string>(); // Evento que se emite al unirse a un juego
  playerName: string = ''; // Nombre del jugador que se va a unir al juego

  /**
   * Método invocado al enviar el formulario de unirse al juego.
   * Emite un evento 'joinGame' con el nombre del jugador.
   */
  onSubmit() {
    this.joinGame.emit(this.playerName);
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al iniciar el componente.
   * Obtiene la lista de juegos disponibles.
   */
  ngOnInit(): void {
    this.getGames();
  }

  constructor(private router: Router) {} // Constructor del componente para inyectar el servicio Router

  /**
   * Maneja la acción de unirse a un juego específico.
   * @param eventData Objeto con el nombre del jugador y el ID del juego al que unirse.
   */
  onJoinGame(eventData: { playerName: string, gameId: number }) {
    console.log('El jugador', eventData.playerName, 'se unió al juego con el ID', eventData.gameId);
    this.connectToGame({ gameId: eventData.gameId.toString(), player: {username: eventData.playerName} });
  }

  /**
   * Conecta al jugador al juego mediante una llamada API.
   * @param player Objeto ConnectRequest con los datos del juego y el jugador.
   */
  connectToGame(player: ConnectRequest) {
    this.apiService
      .postService({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        url: this.url + `${"/game/connect"}`,
        data: player,
      })
      .subscribe({
        next: (response) => {
          this.games = response; // Asigna la respuesta de la API a la lista de juegos
          this.router.navigate(['table', response.gameId, player.player.username]); // Navega a la página de la tabla de juego con el ID y nombre de usuario
        },
        error: (error) => {
          console.error('Error en la autenticación:', error);
          console.error('Detalles del error:', error.message); // Agrega esta línea para más detalles
        },
      });
  }

  /**
   * Obtiene la lista de juegos disponibles mediante una llamada API.
   */
  getGames(): void {
    this.apiService
      .getListService({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        url: this.url + `${"/game/games"}`,
        data: {},
      })
      .subscribe({
        next: (response) => {
          this.games = response; // Asigna la respuesta de la API a la lista de juegos
          console.log("response", this.games);
        },
        error: (error) => {
          console.error('Error en la autenticación:', error);
          console.error('Detalles del error:', error.message); // Agrega esta línea para más detalles
        },
      });
  } 
}
