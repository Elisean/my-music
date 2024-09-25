"use client";
import { Montserrat } from "next/font/google";
import authProvider from "../providers/authProvider";
import { Header } from "../Components/Header/Header";
import { Aside } from "../Components/Aside/Aside";
import { Player } from "../Components/Player/Player";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Store/store";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic-ext"],
});

function MainPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const musicList = useSelector((state: RootState) => state.music.musicList);
 
  return (
    <main className={montserrat.className}>
        <div className="container flex flex-col min-h-screen justify-between">
          <Header />
          
          <div className="flex flex-grow relative z-10">
            <Aside />
            {children}
          </div>

      {
        musicList.length !== 0  && (
            <div className="relative">
              <Player />
            </div>          
        )
      }
       
    </div>
    </main>
   
  );
}

const ProtectedLayout = authProvider(MainPageLayout);
export default ProtectedLayout;


