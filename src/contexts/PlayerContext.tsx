import { createContext, ReactNode, useContext, useState} from 'react';

type Episode = {    
    title: string;
    thumbnail: string;
    members: string;
    publishedAt: string;
    duration: number;
    durationAsString: string;
    url: string;
  };

type  PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    isLoop: boolean;
    isShuffling : boolean;
    play: (episode: Episode) => void;
    playList: (list: Episode[], index: number) => void;
    setPlayingState: (state: boolean) => void;    
    togglePlay: () => void;
    toggleShuffle:() => void;
    toggleLoop: () => void;
    playNext: () => void;
    playPrevious: () => void;
    clearPlayerState: () => void;
    hasNext: boolean;
    hasPrevious: boolean;
    
};

export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProviderProps = {
  children: ReactNode;
}

export function PlayerContextProvider({children}: PlayerContextProviderProps ){
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoop, setIsLoop] = useState(false); 
  const [isShuffling, setIsShuffling] = useState(false); 

  function play(episode: Episode){
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function togglePlay(){
    setIsPlaying(!isPlaying);
  }

  function toggleLoop(){
    setIsLoop(!isLoop);
  }

  function toggleShuffle(){
    setIsShuffling(!isShuffling);
  }

  function setPlayingState(state: boolean){
    setIsPlaying(state);
  }

  function clearPlayerState(){
    setEpisodeList([]);
    setCurrentEpisodeIndex(0);

}

  function playList(list: Episode[], index: number){
      setEpisodeList(list);
      setCurrentEpisodeIndex(index);
      setIsPlaying(true);
  }

  const hasPrevious = currentEpisodeIndex > 0;
  const hasNext = isShuffling || currentEpisodeIndex < episodeList.length;
  
  function playNext(){
   
    if(isShuffling){
      const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length);
      setCurrentEpisodeIndex(nextRandomEpisodeIndex);
    }else if(hasNext){
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    }   
  }

  function playPrevious(){
    if(hasPrevious){
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }
    
  }

  return(
     <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex, 
        play, 
        playList,
        isPlaying,
        isShuffling,
        togglePlay,        
        setPlayingState,
        playNext,
        playPrevious,
        hasPrevious,
        hasNext,
        isLoop,
        toggleLoop, 
        toggleShuffle,
        clearPlayerState
      }}
      >
       {children}
     </PlayerContext.Provider>
     )
} 

export const usePlayer = () => {
  return useContext(PlayerContext);
}