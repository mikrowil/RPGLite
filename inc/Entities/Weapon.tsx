import Item from "./Item";

export default class Weapon extends Item{

    damage:number
    type:string


    constructor(id: number, name: string, value: number, damage: number, type: string) {
        super(id, name, value);
        this.damage = damage;
        this.type = type;
    }
}
