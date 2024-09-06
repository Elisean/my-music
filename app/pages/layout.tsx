"use client";
import { Montserrat } from "next/font/google";
import authProvider from "../providers/authProvider";
import { Header } from "../Components/Header/Header";
import { Aside } from "../Components/Aside/Aside";
import { Player } from "../Components/Player/Player";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic-ext"],
});

function MainPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
   
  return (
    <main className={montserrat.className}>
        <div className="container flex flex-col min-h-screen justify-between">
          <Header />
          <div className="flex flex-grow">
            <Aside />
            {children}
          </div>
          <div>
            <Player />
          </div>
    </div>
    </main>
   
  );
}

const ProtectedLayout = authProvider(MainPageLayout);
export default ProtectedLayout;