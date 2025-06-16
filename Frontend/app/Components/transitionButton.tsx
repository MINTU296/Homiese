// import Image from "next/image";

// export default function TransitionButton(
//     {
//         svg ,
//         text
//     } : {
//         svg : string,
//         text : string
//     }

// ) {

//     return (
//         <div className="flex items-start gap-x-4 justify-start rounded-lg w-full px-12 py-2 flex-wrap  font-work-sans content-center text-md
//             hover:bg-gray-100 hover:text-red-400 cursor-pointer
//         ">
//             <Image src={svg} alt="Homiese" width={25} height={30} />

//             <span className="text-gray-700">{text}</span>
//         </div>
//     );
// }

"use client";  // Mark as Client Component
import Image from "next/image";

export default function TransitionButton({
    svg,
    text,
    onClick
}: {
    svg: string,
    text: string,
    onClick?: () => void  // Accept an onClick function
}) {
    return (
        <div 
            className="flex items-start gap-x-4 justify-start rounded-lg w-full px-12 py-2 flex-wrap font-work-sans content-center text-md
                hover:bg-gray-100 hover:text-red-400 cursor-pointer
            "
            onClick={onClick} // Attach onClick function
        >
            <Image src={svg} alt="Homiese" width={25} height={30} />
            <span className="text-gray-700">{text}</span>
        </div>
    );
}
