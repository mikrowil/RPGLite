import Item from "./Item";

export default class Inventory {
    private inventory:Item[]


    constructor() {
        this.inventory = [];
    }

    public getInventory(){
        return this.inventory
    }

    public addItem(newEntry:Item){
        this.inventory.push(newEntry)
    }

    public setItems(items:Item[]){
        this.inventory = items
    }

    public isEmpty(){
        return this.inventory.length <= 0
    }

    public sortBy(property:String){


        this.inventory = this.inventory.sort((i1,i2)=>{
            if(property === "name"){
                if(i1.name > i2.name){
                    return -1
                }else if(i1.name <i2.name){
                    return 1
                }else {
                    return 0
                }
            }else if(property === "value"){
                if(i1.value > i2.value){
                    return -1
                }else if(i1.value <i2.value){
                    return 1
                }else {
                    return 0
                }
            }else {
                if(i1.id > i2.id){
                    return -1
                }else if(i1.id <i2.id){
                    return 1
                }else {
                    return 0
                }
            }
        })
    }
}
