import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { KnightsService } from '../../services/knights.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-knight',
  templateUrl: './create-knight.component.html',
  styleUrls: ['./create-knight.component.scss']
})
export class CreateKnightComponent implements OnInit {

  knightForm: FormGroup;
  weapons: FormArray;

  constructor(
    private formBuilder: FormBuilder,
    private knightService: KnightsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.knightForm = this.formBuilder.group({
      name: this.formBuilder.control('', { validators: Validators.required }),
      nickname: this.formBuilder.control('', { validators: Validators.required }),
      birthday: this.formBuilder.control('', { validators: Validators.required }),
      weapons: this.formBuilder.array([]),
      attributes: this.formBuilder.group({
        strength: this.formBuilder.control(0, { validators: Validators.required }),
        dexterity: this.formBuilder.control(0, { validators: Validators.required }),
        constitution: this.formBuilder.control(0, { validators: Validators.required }),
        intelligence: this.formBuilder.control(0, { validators: Validators.required }),
        wisdom: this.formBuilder.control(0, { validators: Validators.required }),
        charisma: this.formBuilder.control(0, { validators: Validators.required }),
      }),
      keyAttribute: this.formBuilder.control('', { validators: Validators.required }),
    });

    this.addWeapon();
  }

  createWeapon(): FormGroup {
    return this.formBuilder.group({
      name: this.formBuilder.control('', { validators: Validators.required }),
      mod: this.formBuilder.control(0, { validators: Validators.required }),
      attr: this.formBuilder.control('', { validators: Validators.required }),
      equipped: this.formBuilder.control(false, { validators: Validators.required }),
    })
  }

  addWeapon(): void {
    this.weapons = this.knightForm.get('weapons') as FormArray;
    this.weapons.push(this.createWeapon());
  }

  removeWeapon(index: number): void {
    this.weapons.removeAt(index);
  }

  setEquippedWeapon(i: number): void {
    this.weapons.controls.map((el, index) => {
      if (i != index) {
        el.setValue({ ...el.value, equipped: false });
      }
    })
  }

  onSubmit(): void {
    if (!this.knightForm.valid) {
      return
    }
    
    this.knightService.createKnight(this.knightForm.value).pipe(take(1)).subscribe(() => {
      this.router.navigate(['/']);
    })
  }
}
