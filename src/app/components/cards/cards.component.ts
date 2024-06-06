import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';

interface Card {
  idCard: number;
  image: string;
  phrase: string;
  name: string;
  number: number;
  state: string;
  left?: string;
  zIndex?: number;
  transform?: string;
}

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
})
export class CardsComponent implements OnInit {
  cards1: Card[] = [
    {
      idCard: 1,
      image: './assets/images/1.jpg',
      phrase: 'This is a phrase 1',
      name: 'Card 1',
      number: 1,
      state: 'active',
    },
    {
      idCard: 2,
      image: './assets/images/2.jpg',
      phrase: 'This is a phrase 2',
      name: 'Card 2',
      number: 2,
      state: 'active',
    },
    {
      idCard: 3,
      image: './assets/images/3.jpg',
      phrase: 'This is a phrase 3',
      name: 'Card 3',
      number: 3,
      state: 'active',
    },
    {
      idCard: 4,
      image: './assets/images/4.jpg',
      phrase: 'This is a phrase 4',
      name: 'Card 4',
      number: 4,
      state: 'active',
    },
    {
      idCard: 5,
      image: './assets/images/5.jpg',
      phrase: 'This is a phrase 5',
      name: 'Card 5',
      number: 5,
      state: 'active',
    },
    {
      idCard: 6,
      image: './assets/images/6.jpg',
      phrase: 'This is a phrase 6',
      name: 'Card 6',
      number: 6,
      state: 'active',
    },
    {
      idCard: 7,
      image: './assets/images/7.jpg',
      phrase: 'This is a phrase 7',
      name: 'Card 7',
      number: 7,
      state: 'active',
    },
    {
      idCard: 8,
      image: './assets/images/8.jpg',
      phrase: 'This is a phrase 8',
      name: 'Card 8',
      number: 8,
      state: 'active',
    },
    {
      idCard: 9,
      image: './assets/images/9.jpg',
      phrase: 'This is a phrase 9',
      name: 'Card 9',
      number: 9,
      state: 'active',
    },
    {
      idCard: 10,
      image: './assets/images/10.jpg',
      phrase: 'This is a phrase 10',
      name: 'Card 10',
      number: 10,
      state: 'active',
    },
  ];

  droppedCard: number | null = null;

  currentIndex = 0;

  ngOnInit(): void {
    this.initializeCards();
  }

  initializeCards() {
    let len = this.cards1.length;
    let left = -10;
    let s = 10;
    for (let i = len - 1; i >= 0; i--) {
      this.cards1[i].left = (left += 0) + 'px';
      this.cards1[i].zIndex = len - i;
    }
  }

  nextCardLoteria(index: number) {
    this.droppedCard = index;
    setTimeout(() => {
      this.cards1.splice(index, 1);
      this.droppedCard = null;
      this.initializeCards();
    }, 500);
  }
}
