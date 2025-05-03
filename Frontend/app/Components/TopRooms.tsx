import ChatAvatar from "@/app/Components/ChatAvatar";

export default function TopRooms(){
    return (
        <div className="w-full h-[40%] flex flex-col justify-around bg-white px-3 mx-2 rounded-2xl shadow-xl text-sm text-black">
            <span className="flex px-2 text-red-400 font-semibold">
                People you may know
            </span>

            <div className="flex flex-col mt-[5%] gap-2">
                {/*user image needs to be in private directory not in public*/}
                <ChatAvatar name="Webstars Shivaji" AdditionalInfo="President at Websters-shivaji" join={true} imgPath="/UserImg.svg"/>
                <ChatAvatar name="Webstars Shivaji" AdditionalInfo="Technical Head @ Enactus" join={true} imgPath="/UserImg.svg"/>
                <ChatAvatar name="Webstars Shivaji" AdditionalInfo="3rd Year undergrad student student" join={true} imgPath="/UserImg.svg"/>

            </div>

            <div className=" flex items-center mx-4 text-red-400 text-xs ">
                See more..
            </div>
        </div>
    );
}