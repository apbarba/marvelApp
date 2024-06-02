import { Routes } from '@angular/router';
import { CharactersComponentComponent } from './components/characters-component/characters-component.component';
import { IndexComponent } from './components/index/index.component';
import { NavbarComponent } from './components/navbar/navbar.component';

export const routes: Routes = [
  {
    path: '',
    component: NavbarComponent,
    children: [
      {
        path: '',
        component: IndexComponent
      },
      {
        path: 'characters',
        component: CharactersComponentComponent
      }
    ]
  }
];

