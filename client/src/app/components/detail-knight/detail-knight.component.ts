import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Knight } from '../../models/knight.model';
import { ActivatedRoute } from '@angular/router';
import { KnightsService } from '../../services/knights.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-detail-knight',
  templateUrl: './detail-knight.component.html',
  styleUrls: ['./detail-knight.component.scss']
})
export class DetailKnightComponent implements OnInit {  
  knight: Knight;

  constructor(
    private knightService: KnightsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
  
    this.knightService.getKnight(id).pipe(map(res => {
      console.log(res);
      return res;
    })).subscribe(res => {
      this.knight = res;
    })
  }
}
