import { Routes } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { TableComponent } from './components/table/table.component';
import { CardsComponent } from './components/cards/cards.component';

export const routes: Routes = [
  {
    path: 'chat/:userId',
    component: ChatComponent,
  },
  {
    path: 'tablero',
    component: TableComponent
  },
  {
    path: 'cards',
    component: CardsComponent
  }
];
