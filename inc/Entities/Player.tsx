import Item from "./Item";
import Inventory from "./Inventory";

export default class Player{
    id:number;
    level:number;
    exp:number;
    maxExp:number;
    name:String;
    attack:number;
    defense:number;
    health:number;
    maxHealth:number;
    isDead:boolean;

    inventory: Inventory;
    money:number;

    constructor(id: number,level:number,exp:number, maxExp:number,name: String, attack: number, defense: number, health: number, maxHealth: number, isDead: boolean) {
        this.id = id;
        this.level = level;
        this.exp = exp;
        this.maxExp = maxExp;
        this.name = name;
        this.attack = attack;
        this.defense = defense;
        this.health = health;
        this.maxHealth = maxHealth;
        this.isDead = isDead;

        this.inventory = new Inventory()
        this.money = 0

        this.calculateAttributes()
    }

    setInventory(inv:Inventory){
        this.inventory = inv
    }

    public gainExp(exp:number){
        let newExp = this.exp + exp
        if(newExp >= this.maxExp){
            let remainder = newExp - this.maxExp
            this.exp = 0
            this.levelUp()
            this.gainExp(remainder)
        }else {
            this.exp = newExp
        }


    }

    public levelUp(){
        this.level++
        this.attack+=2
        this.defense+=2
        this.maxHealth+=10
        this.calculateExpTotal()
    }

    public calculateAttributes(){
        this.calculateExpTotal()
    }

    public calculateExpTotal(){
        this.maxExp = Math.round((4 * (this.level**3))/5) + 5
    }


}
