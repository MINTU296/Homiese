import Image from "next/image";

export default function ChatAvatar(

    {
        name ,
        AdditionalInfo ,
        imgPath ,
        join
    }:
    {
        name : string,
        AdditionalInfo : string,
        imgPath : string,
        join : boolean
    }

){
    return (
        <div className="flex gap-4 text-xs ">
            <Image src={imgPath} alt="UserAvatar" width={50} height={50} />
            <div className="flex flex-col">
                <span className="font-bold truncate whitespace-nowrap overflow-hidden">
                    {name}
                </span>

                <span className="text-xs truncate whitespace-nowrap overflow-hidden w-24">
                    {AdditionalInfo}
                </span>

            </div>

            <div className="flex flex-col text-sm">
                <Image src="/followButton.svg" alt="Follow" width={20} height={20} />
                {join ? <span className="text-xs">Join</span>  : <span className="text-xs">Follow</span>}
            </div>



        </div>
    );
}