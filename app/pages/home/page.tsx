import { PlayList } from "@/app/Components/PlayList/PlayList";
import Title from "@/app/Components/UI/Title/Title";

function Home() {
    return (
      <main  className="bg-gradient-homePage min-w-150">
        <Title>Your Playlists</Title>
        <div className="w-full flex justify-between mt-4 flex-wrap">
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