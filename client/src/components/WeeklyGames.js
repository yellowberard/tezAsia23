import WeeklyGameCard from "./WeeklyGamesCard";
import sudokuImg from '../assets/sudoku.png'

const WeeklyGame =()=>{
return(
    <div className="Flex flex-column weekly-games w-full h-max justify-center items-center">
        <span className="text-[5rem] weekly-heading w-full h-max font-bold mb-3 "> Weekly Contest </span>
        <div className="flex justify-between">
        <WeeklyGameCard image={sudokuImg} bidAmount='100' />
        <WeeklyGameCard image={sudokuImg} bidAmount='100' />
        </div>
    </div>
)

}

export default WeeklyGame;