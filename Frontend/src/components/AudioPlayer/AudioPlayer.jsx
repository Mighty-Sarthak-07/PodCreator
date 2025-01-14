import React, { useRef,useEffect,useState } from 'react';
import { FaPause} from "react-icons/fa";
import { FaPlay} from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { playerActions } from '../../store/player';

const AudioPlayer = () => {
  const [IsaudioPlaying, setIsaudioPlaying] = useState(false);
  const [currentTime, setcurrentTime] = useState();
  const [Duration, setDuration] = useState();
  const dispatch = useDispatch();
  const PlayerDivState = useSelector((state) => state.player.isPlayerDiv);
  const songPath = useSelector((state) => state.player.songPath);
  const currentImage = useSelector((state) => state.player.img);

  const audioRef = useRef();

  const formatTime = (time) =>{
    const minutes = Math.floor(time/60);
    const seconds = Math.floor(time%60);
    return `${minutes}:${seconds<10 ? "0" : ""}${seconds}`;
  }

  const closeAudioPlayer = (e) =>{
    e.preventDefault();
    dispatch(playerActions.closeDiv());
    dispatch(playerActions.changeImage(""));
    dispatch(playerActions.changeSong(""));
  }
  const handlePlay =()=>{
    setIsaudioPlaying(!IsaudioPlaying);
    if(IsaudioPlaying){
      audioRef.current.pause();
    }else{
    audioRef.current.play();
    }
  }
  const handleTimeupdate = () =>{
    if(audioRef.current){
      setcurrentTime(audioRef.current.currentTime)
    }
  }
  const handleLoadedMetadata = () =>{
    if(audioRef.current){
      setDuration(audioRef.current.duration);
    }
  }
  const handleSee = () =>{
    
  }
  const Backward = () =>{
    if(audioRef.current){
      let newTime = Math.max(Duration-10,0);
      audioRef.current.currentTime = newTime;
    setcurrentTime(newTime);    }
  }
  const Forward = () =>{
    if(audioRef.current){
      let newTime = Math.min(currentTime+10,Duration);
      audioRef.current.currentTime = newTime;
    setcurrentTime(newTime);      }
  }
  useEffect(() => {
    handlePlay();
    const currentAudio = audioRef.current;
    if(currentAudio){
      currentAudio.addEventListener("timeupdate",handleTimeupdate);
      currentAudio.addEventListener("loadedmetadata",handleLoadedMetadata);
    }
    
  }, [songPath])
  
  return (
    <div className= { `${PlayerDivState? "fixed" : "hidden"} bottom-0 left-0 w-[100%] bg-zinc-900 text-white py-6 flex items-center gap-4 px-1`} >
      <div className="hidden md:block w-1/3"><img src={currentImage} className={`size-24 mx-4 rounded-full object-fit`} alt="img" /></div>
      <div className="w-full md:w-1/3 flex flex-col items-center ml-10 sm:m-0 justify-center">
      <div className="w-full flex items-center justify-center gap-4 text-xl">
        <button onClick={Backward}><IoPlaySkipBack /></button>
        <button onClick={handlePlay}>
          {IsaudioPlaying ? <FaPause/> : <FaPlay/>}
        </button>
        <button onClick={Forward}><IoPlaySkipForward/></button>
        </div><div className="w-full flex items-center mt-4 justify-center text-white">
          <input type="range" min="0" max="100" value = {(currentTime/Duration)*100 || 0} className='w-full hover:cursor-pointer' onChange={handleSee}/></div>
          <div className="w-full justify-between items-center text-sm flex ">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(Duration)}</span>
          </div>
        
        </div>
        <div className="w-1/3 flex items-center mx-4 justify-end">
        <button onClick={closeAudioPlayer}>
          <ImCross/>
        </button>
        </div>
        <audio ref={audioRef} src={songPath} />
    </div>
  )
}

export default AudioPlayer
