"use client"
import Content from "@/app/Components/Content";
import TopChats from "@/app/Components/TopChats";
import TopRooms from "@/app/Components/TopRooms";

export default function Home (){

  return (
      <div className=" h-screen flex ">


          {/*Scrollable Content*/}
          <div className="flex flex-col px-3 w-[75%] ">
             <Content />
          </div>

          {/* Recommendation Based on the user*/}
          <div className="h-full w-[25%] gap-4 flex flex-col">
              <TopChats />
              <TopRooms />
          </div>


      </div>
  );
}
