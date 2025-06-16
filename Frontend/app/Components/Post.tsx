import Image from "next/image";
import CommentSection from "@/app/Components/Commentsection";

export default function Post(
    {
         ContentPostedBy,
        ContentProfileImage,
         ContentTitle,
         ContentDescription,
         ContentImage ,
         ContentImagePath,
        ContentLiked
    } : {
        ContentPostedBy: string;
        ContentProfileImage: string;
        ContentTitle: string;
        ContentDescription: string;
        ContentImage: boolean;
        ContentImagePath: string;
        ContentLiked : number;
    }

){
    return (
        <div className={"flex flex-col gap-2 p-5 bg-white shadow-md rounded-xl text-black"}>

            <div className={"flex items-center gap-2 text-sm"}>
                <Image src={ContentProfileImage} alt={"User Profile"} width={50} height={50} />
                {ContentPostedBy}
                <span> {">"} </span>
                {ContentTitle}
            </div>


            <div className={"text-md py-2"}>
                {ContentDescription}
            </div>
            {
                ContentImage ?
                    <div className={"w-full"}>
                        <Image src={ContentImagePath} alt={"Content Image"}
                               width={150} height={150}
                                className={"w-full h-auto rounded-lg object-cover"}
                        />
                    </div>
                : null
            }

            <div className={"flex mt-2 gap-2"}>
                <Image src={"/likeButton.svg"} alt={"Like Button"} width={20} height={20} />
                {ContentLiked}
            </div>

            <div>
                <CommentSection />
            </div>

        </div>
    );
}