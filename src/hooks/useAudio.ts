import { useRef } from "react"

export default function useAudio(){

    const audioRef = useRef<HTMLAudioElement>(null)

    const play = ()=>{
        audioRef.current?.play()
    }

    const pause = ()=>{
        audioRef.current?.pause()
    }

    return {

        audioRef,
        play,
        pause

    }

}