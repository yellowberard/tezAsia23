const TrendingCard = ({image, name}) => {
    return (
      <div className="flex flex-col items-center mt-[2rem]" >
          <div className="rounded-2xl cursor-pointer overflow-hidden  " >
              <img src={image} className="hover:scale-110 duration-300 " />
          </div>
  
          <div className="flex items-center space-x-1 mt-4 " >
              <h1 className="font-bold text-lg" >{name}</h1>
          </div>
      </div>
    )
  }
  
  export default TrendingCard