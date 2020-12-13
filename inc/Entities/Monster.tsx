export default class Monster{
    id:number;
    level:number;
    expToGive:number;
    name:String;
    attack:number;
    defense:number;
    health:number;
    maxHealth:number;
    isDead:boolean;


    constructor(id: number, level: number,expToGive:number, name: String, attack: number, defense: number, health: number,maxHealth:number, isDead: boolean) {
        this.id = id;
        this.level = level;
        this.expToGive = expToGive;
        this.name = name;
        this.attack = attack;
        this.defense = defense;
        this.health = health;
        this.maxHealth = maxHealth;
        this.isDead = isDead;
    }

    public getExp(){
        return Math.round(this.expToGive * this.level * 1.2)
    }
}
