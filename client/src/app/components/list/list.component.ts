import { Component, OnInit, OnDestroy } from '@angular/core';
import { take } from 'rxjs/operators';
import { KnightsService } from '../../services/knights.service';
import { Knight } from '../../models/knight.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  knights: Array<Knight>
  displayedColumns: string[] = ['name', 'age', 'weapons', 'keyAttribute', 'attack', 'exp', 'edit'];

  constructor(
    private knightService: KnightsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.knightService.getKnights().pipe(take(1)).subscribe(res => {
      this.knights = res;
    })
  }

  deleteKnight(knight: Knight): void {    
    const ind = this.knights.findIndex((element, index, array) => {
      return knight._id === element._id
    });

    this.knightService.removeKnight(knight._id).pipe(take(1)).subscribe(() => {
      this.knights.splice(ind, 1);

      this.knights = [...this.knights];
    })
  }

  goToKnightDetails(knight: Knight): void {
    this.router.navigate(['', knight._id])
  }

}
