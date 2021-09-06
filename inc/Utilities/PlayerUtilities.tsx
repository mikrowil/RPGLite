import Player from "../Entities/Player";
import {db,auth} from "../ConfigFirebase"
import firebase from "firebase";


export default class PlayerUtilities {


    public savePlayer(player:Player){
        db.ref("users/"+auth.currentUser?.uid).set(player).then()
    }

    public async loadPlayer(){
        let playerToReturn: any

        db.ref("users").child(auth.currentUser?.uid as string).get().then((s)=>{
            playerToReturn = s.val()
        }).finally(()=>{
            return playerToReturn
        })
    }

}
