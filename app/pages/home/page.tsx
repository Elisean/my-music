import { PlayList } from "@/app/Components/PlayList/PlayList";
import Title from "@/app/Components/UI/Title/Title";

function Home() {
    return (
      <main className="bg-gradient-homePage w-full xxs:px-2">
        <Title className="xxs:mt-7">Your Playlists</Title>
        <div className="
          w-full 
          flex 
          justify-between 
          flex-wrap
          ">
          <PlayList>
              Anime
          </PlayList>
          <PlayList>
              Rock
          </PlayList>
          <PlayList>
              Rap
          </PlayList>
        </div>
      </main>
    );
  }
export default Home;