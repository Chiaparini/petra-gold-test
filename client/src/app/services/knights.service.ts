import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Knight } from '../models/knight.model';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { Weapon } from '../models/weapon.model';

@Injectable()
export class KnightsService {

  apiuri = 'http://localhost:3000/knights';

  constructor(private http: HttpClient) { }

  getKnight(id: string): Observable<Knight> {
    return this.http.get<Knight>(`${this.apiuri}/${id}`).pipe(map(res => {
        res.exp = this.getExperience(res);
        res.attack = this.getAttack(res);
        res.age = this.getAge(res);
        return res;
    }));
  }

  getKnights(): Observable<Array<Knight>> {
    return this.http.get<Array<Knight>>(`${this.apiuri}`).pipe(map(res => {
      return res.map((el: Knight) => {
        el.exp = this.getExperience(el);
        el.attack = this.getAttack(el);
        el.age = this.getAge(el);
        return el;
      })
    }));
  }

  createKnight(knight: Knight): Observable<Knight> {
    return this.http.post<Knight>(this.apiuri, knight);
  }

  updateKnight(id: string, nickname: string): Observable<Knight> {
    return this.http.put<Knight>(`${this.apiuri}/${id}`, nickname);
  }

  removeKnight(id: string): Observable<Object> {
    return this.http.delete(`${this.apiuri}/${id}`);
  }

  getHeroes(): Observable<Array<Knight>> {
    return this.http.get<Array<Knight>>(`${this.apiuri}?filter=heroes`).pipe(map(res => {
      return res.map((el: Knight) => {
        el.exp = this.getExperience(el);
        el.attack = this.getAttack(el);
        el.age = this.getAge(el);
        return el;
      })
    }));
  }

  getAge(knight: Knight): number {
    const birthday = moment.utc(knight.birthday),
    now = moment(),
    diff = now.subtract(birthday.year(), 'years');
    
    return diff.year();
  }

  getExperience(knight: Knight): number {
    const birthday = moment.utc(knight.birthday),
    now = moment(),
    diff = now.subtract(birthday.year(), 'years'),
    exp = Math.floor((diff.year() - 7) * Math.pow(22, 1.45));

    return exp;
  }

  getAttack(knight: Knight): number {
    const equippedWeapon: Weapon = knight.weapons.find(el => el.equipped);

    return 10 + this.getMod(knight) + equippedWeapon.mod ;
  }

  getMod(knight: Knight): number {
    const attrValue = knight.attributes[knight.keyAttribute];

    switch (true) {
      case (attrValue <= 8): 
        return -2;
      case (attrValue >= 9 && attrValue <= 10):
        return -1;
      case (attrValue >= 11 && attrValue <= 12):
        return 0;
      case (attrValue >= 13 && attrValue <= 15):
        return 1;
      case (attrValue >= 16 && attrValue <= 18):
        return 2;
      case (attrValue >= 19 && attrValue <= 20):
        return 3;
      default:
        break;
    }
  }
  
}
