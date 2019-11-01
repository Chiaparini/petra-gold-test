import { Weapon } from './weapon.model';
import { Attributes } from './attributes.model';

export interface Knight {
    _id?: string;
    name: string;
    nickname: string;
    birthday: Date;
    exp?: number;
    attack?: number;
    age?: number;
    weapons: Array<Weapon>;
    attributes: Attributes;
    keyAttribute: string;
}