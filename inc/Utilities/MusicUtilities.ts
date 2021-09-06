import {Audio} from "expo-av";

export default class MusicUtilities{
    private music:Audio.Sound

    constructor() {
        this.music = new Audio.Sound()
    }

    async checkMusic() {
        let status:boolean;

        await this.music.getStatusAsync().then((s) => {
            status = s.isLoaded
        }).finally(async () => {
            if(!status){
                await this.music.loadAsync(require("../../assets/audio/bensound-relaxing.mp3"))
                await this.playMusic()
            }else {
                await this.playMusic()
            }
        })
    }

    async playMusic(){

        await this.music.playAsync()
    }
}
