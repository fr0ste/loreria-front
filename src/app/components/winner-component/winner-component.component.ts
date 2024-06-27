// Importaciones necesarias
import { Component, Input, OnInit } from '@angular/core'; 
import confetti from 'canvas-confetti'; 
import { Router } from '@angular/router'; 

// Componente para mostrar al ganador
// Desarrollado por Getzemani Alejandro Gonzalez Cruz
@Component({
  selector: 'app-winner-component', 
  standalone: true, 
  templateUrl: './winner-component.component.html', 
  styleUrls: ['./winner-component.component.css'], 
})
export class WinnerComponentComponent implements OnInit {
  constructor(private router: Router) {} // Constructor del componente para inyectar el servicio Router

  /**
   * Navega al lobby (página de inicio de sesión).
   */
  navigateToLobby() {
    this.router.navigate(['/login']);
  }

  @Input() gameId: number = 0; // Entrada: identificador único del juego (asegúrate de tener esta entrada para gameId)
  playerName: string = ''; // Nombre del jugador

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializarse el componente.
   * Lanza el efecto de confeti al cargar el componente.
   */
  ngOnInit(): void {
    this.launchConfetti();
  }

  /**
   * Lanza el efecto de confeti en el componente utilizando la biblioteca 'canvas-confetti'.
   */
  launchConfetti() {
    const duration = 10 * 1000; // Duración del efecto en milisegundos
    const animationEnd = Date.now() + duration; // Tiempo final de la animación
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }; // Configuraciones predeterminadas para el confeti

    // Función para obtener un número aleatorio dentro de un rango
    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    // Intervalo para lanzar confeti durante un período de tiempo
    const interval: any = setInterval(function() { // Asegúrate de declarar 'interval' como 'any' debido a la falta de tipado específico en setInterval
      const timeLeft = animationEnd - Date.now(); // Tiempo restante de la animación

      if (timeLeft <= 0) {
        return clearInterval(interval); // Detiene el intervalo cuando la animación ha finalizado
      }

      const particleCount = 50 * (timeLeft / duration); // Cantidad de partículas de confeti según el tiempo restante
      // Lanza confeti desde dos posiciones aleatorias en la pantalla
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250); // Intervalo de tiempo entre cada lanzamiento de confeti
  }
}
