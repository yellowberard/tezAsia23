// import Footer from "./components/Footer";
// import Header from "../components/Header/Header";
import Hero from "../components/Hero";
import Trending from "../components/Trending";
import WeeklyGame from "../components/WeeklyGames";

function Home() {
  return (
    <main className="text-white">
      <div className="w-full xl:max-w-[1250px] mx-auto px-4 " >
        <Hero />
        <Trending />
        <WeeklyGame />
      </div>
      {/* <Footer /> */}
    </main>
  );
}

export default Home;