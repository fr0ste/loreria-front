import { Routes } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { TableComponent } from './components/table/table.component';
import { LoteriaComponent } from './components/loteria/loteria.component';
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
    path: 'login',
    component: LobbyPlayerComponent
  },
  {
    path: '',
    component: LoteriaComponent
  }
];
