import { Component, Input, OnInit } from '@angular/core';
import confetti from 'canvas-confetti';
import { Router } from '@angular/router';


@Component({
  selector: 'app-winner-component',
  standalone: true,
  templateUrl: './winner-component.component.html',
  styleUrls: ['./winner-component.component.css'],
})
export class WinnerComponentComponent implements OnInit {
  constructor(private router: Router) {}


  navigateToLobby() {
    this.router.navigate(['/login']);
  }

  @Input() gameId: number = 0; // Asegúrate de tener esta entrada para gameId
  playerName: string = '';

  ngOnInit(): void {
    this.launchConfetti();
  }

  launchConfetti() {
    const duration = 10 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() { // Asegúrate de declarar 'interval' como 'any'
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
  }
}
