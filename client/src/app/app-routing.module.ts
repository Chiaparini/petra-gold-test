import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { CreateKnightComponent } from './components/create-knight/create-knight.component';
import { ListHeroesComponent } from './components/list-heroes/list-heroes.component';
import { EditKnightComponent } from './components/edit-knight/edit-knight.component';
import { DetailKnightComponent } from './components/detail-knight/detail-knight.component';


const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'create-knight',
    component: CreateKnightComponent
  },
  {
    path: 'heroes',
    component: ListHeroesComponent
  },
  {
    path: 'edit-knight/:id',
    component: EditKnightComponent
  }, 
  {
    path: ':id',
    component: DetailKnightComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
