import { Routes } from '@angular/router';
import { CantadorStartComponent } from './components/cantador-start/cantador-start.component';
import { CardsComponent } from './components/cards/cards.component';
import { LobbyPlayerComponent } from './components/lobby-player/lobby-player.component';
import { LoginComponent } from './components/login/login.component';
import { TableComponent } from './components/table/table.component';
import { WaitingComponent } from './components/waiting/waiting.component';


export const routes: Routes = [
  {
    path: 'table/:game/:player',
    component: TableComponent
  },
  {
    path: 'lobby',
    component: LobbyPlayerComponent
  },
   {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'cards/:id',
    component: CardsComponent
  },{ 
    path: '',
    component: LoginComponent
  },
  {
    path: 'waiting',
    component: WaitingComponent
  },
  {
    path: 'cantador-start',
    component: CantadorStartComponent
  }
];
