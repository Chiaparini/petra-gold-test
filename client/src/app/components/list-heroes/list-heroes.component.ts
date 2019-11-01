import { Component, OnInit } from '@angular/core';
import { Knight } from '../../models/knight.model';
import { KnightsService } from '../../services/knights.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-list-heroes',
  templateUrl: './list-heroes.component.html',
  styleUrls: ['./list-heroes.component.scss']
})
export class ListHeroesComponent implements OnInit {

  heroes: Array<Knight>
  displayedColumns: string[] = ['name', 'age', 'weapons', 'keyAttribute', 'attack', 'exp'];

  constructor(private knightService: KnightsService) { }

  ngOnInit() {
    this.knightService.getHeroes().pipe(take(1)).subscribe(res => {
      this.heroes = res;
    })
  }

}
