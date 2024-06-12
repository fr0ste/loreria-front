import { Routes } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { TableComponent } from './components/table/table.component';
import { CardsComponent } from './components/cards/cards.component';
import { LoteriaComponent } from './components/loteria/loteria.component';
import { WaitingComponent } from './components/waiting/waiting.component';
import { LobbyPlayerComponent } from './components/lobby-player/lobby-player.component';


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
    path: 'lobby',
    component: LobbyPlayerComponent
  },
  {
    path: 'cards',
    component: CardsComponent
  },{ 
    path: '',
    component: LoteriaComponent
  },
  {
    path: 'waiting',
    component: WaitingComponent
  }
];
