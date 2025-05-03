import ChatAvatar from "@/app/Components/ChatAvatar";


export default function TopChats(){
    return (
        <div className="w-full h-[40%] flex flex-col justify-around bg-white px-3 mx-2 rounded-2xl shadow-xl text-sm text-black">
            <span className="flex items-center justify-center text-red-400 font-semibold">
                Based on your communities
            </span>

            <div className="flex flex-col mt-[5%] gap-2">
                {/*user image needs to be in private directory not in public*/}
                <ChatAvatar name="Webstars Shivaji" AdditionalInfo="764 Members" join={true} imgPath="/UserImg.svg"/>
                <ChatAvatar name="Webstars Shivaji" AdditionalInfo="764 Members" join={true} imgPath="/UserImg.svg"/>
                <ChatAvatar name="Webstars Shivaji" AdditionalInfo="764 Members" join={true} imgPath="/UserImg.svg"/>

            </div>

            <div className=" flex items-center mx-4 text-red-400 text-xs ">
                See more..
            </div>
        </div>
    );
}