"use client";
import { Montserrat } from "next/font/google";
import authProvider from "../providers/authProvider";
import { Header } from "../Components/Header/Header";
import { Aside } from "../Components/Aside/Aside";
import { Player } from "../Components/Player/Player";
import { TrackList } from "../Components/TrackList/TrackList";
import React from "react";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic-ext"],
});

function MainPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
   const [currentTrack, setCurrentTrack] = React.useState<string | null>(null)

 

  return (
    <main className={montserrat.className}>
        <div className="container flex flex-col min-h-screen justify-between px-2">
          <Header />
          <div className="flex flex-grow relative">
            <Aside setCurrentTrack={setCurrentTrack} />
            {children}

            <div className="overflow-x-hidden flex flex-col ml-6 xxs:hidden">
               
            </div>
          
          </div>
          <div>
            <Player currentTrack={currentTrack} />
          </div>
    </div>
    </main>
   
  );
}

const ProtectedLayout = authProvider(MainPageLayout);
export default ProtectedLayout;


{/* <div>Story</div>
 <TrackList>
  <li className='pl-4'>aaaaa aaaaa aaaaaaaaaaaaaaaaaaaaaaaaa</li>
  <li>ssssss</li>
  <li>uuuuuu</li>
  <li>uuuuuu</li>
  <li>uuuuuu</li>
  <li>uuuuuu</li>
  <li>uuuuuu</li>
  <li>uuuuuu</li>
  <li>uuuuuu</li>
  <li>uuuuuu</li>
  <li>uuuuuu</li>
  <li>uuuuuu</li>
  <li>uuuuuu</li>
  <li>uuuuuu</li>
  <li>uuuuuu</li>
  <li>uuuuuu</li>
  <li>uuuuuu</li>
  <li>uuuuuu</li>
  <li>uuuuuu</li>
  <li>uuuuuu</li>
  <li>uuuuuu</li>
  <li>uuuuuu</li>
  <li>uuuuuu</li>
  <li>uuuuuu</li>
  <li>uuuuuu</li>
  <li>uuuuuu</li>
  <li>uuuuuu</li>
</TrackList>  */}
