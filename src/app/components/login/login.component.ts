import { Component } from '@angular/core'; 
import { Router } from '@angular/router'; 

// Componente para la página de inicio de sesión
@Component({
  selector: 'app-login', 
  standalone: true,
  templateUrl: './login.component.html', 
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent {

  constructor(private router: Router) {} // Constructor del componente para inyectar el servicio Router

  /**
   * Navega a la página del lobby.
   */
  navigateToLobby() {
    this.router.navigate(['/lobby']);
  }

  /**
   * Navega a la página de inicio del juego 'cantador-start'.
   */
  navigateToCantadorStart() {
    this.router.navigate(['/cantador-start']);
  }
}
