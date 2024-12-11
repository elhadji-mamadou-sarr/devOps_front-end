import { Routes } from '@angular/router';
import { EtudiantsComponent } from './component/etudiants/etudiants.component';

export const routes: Routes = [

  { path: '', component: EtudiantsComponent },
  { path: 'etudiants', component: EtudiantsComponent },
];
