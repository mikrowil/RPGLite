import Item from "./Item";

export default class Store {
    private items:Item[]


    public constructor() {
        this.items = []
    }

    public getItems(){
        return this.items
    }

    public addItem(newEntry:Item){
        this.items.push(newEntry)
    }

    public setItems(items:Item[]){
        this.items = items
    }

    public isEmpty(){
        return this.items.length <= 0
    }

    public sortBy(property:String){


        this.items = this.items.sort((i1,i2)=>{
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
