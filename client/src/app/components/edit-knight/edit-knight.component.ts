import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { KnightsService } from '../../services/knights.service';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-knight',
  templateUrl: './edit-knight.component.html',
  styleUrls: ['./edit-knight.component.scss']
})
export class EditKnightComponent implements OnInit {
  name$: Observable<string>;
  id: string;
  knightForm: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private knightService: KnightsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.knightForm = this.formBuilder.group({
      nickname: this.formBuilder.control('', { validators: Validators.required }),
    });

    this.name$ = this.route.params.pipe(map(el => {
      this.id = el.id;
      return el.name
    }));
  }

  onSubmit(): void {
    if (!this.knightForm.valid) {
      return
    }
    
    this.knightService.updateKnight(this.id, this.knightForm.value).pipe(take(1)).subscribe(() => {
      this.router.navigate(['/']);
    })

  }

}
