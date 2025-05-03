import Image from "next/image";

interface ObjectProps {
    name : string;
    batch : string;
    info : string;
    followers : number;
}
export default function MentorDisplay(
    {
        name ,
        batch ,
        info ,
        followers
    }: ObjectProps
){


    return (
        <div className={'flex rounded-2xl h-full shadow-xl p-4 gap-x-3 bg-white'}>

            <div className={'flex flex-col justify-center items-center w-1/4 '}>
                <Image src={'/UserImg.svg'} alt={'User Image'} width={70} height={20} />
                <span className={'font-semibold'}>
                    {name}
                </span>
                <span>
                    {followers} Follower
                </span>
            </div>

            <div className={'flex flex-col justify-center w-[60%]'}>
                <span>
                    Course&nbsp;: {batch}
                </span>
                <span>
                    About &nbsp; : {info}
                </span>
            </div>

            <div 
            onClick={() => window.location.href = "http://localhost:5173"}
            className={'rounded-xl shadow-sm w-[20%] font-semibold text-white bg-red-400 h-10 flex justify-center items-center cursor-pointer'}>
                Connect
            </div>
        </div>
    );
}