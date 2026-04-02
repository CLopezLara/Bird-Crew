import "../../Styles/Home/Home.css";
import Contactfooter from "./Contactfooter";
import FirstSection from "./FirstSection";
import HomeCards from "./HomeCards";
import Socialmedia from "./Socialmedia";
import Tools from "./Tools";

function Home() {
  return (
    <div className="home">
      <FirstSection />
      <HomeCards />
      <Tools />
      <Socialmedia />
      <Contactfooter />
    </div>
  );
}

export default Home;
