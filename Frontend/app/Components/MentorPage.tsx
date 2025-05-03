import MentorDisplay from "@/app/Components/mentorDisplay";

interface mentor {
    name : string,
    batchData : string,
    info : string,
    followers : number;

}

interface objectProps {
    mentors : mentor[];
}

export default function MentorPage(
    {
        mentors
    }: objectProps
)

{

    return (
        <div className={'overflow-auto flex flex-col gap-y-10 '}>

                {mentors.map((mentorData, index) => (
                    <MentorDisplay
                        key={mentorData.name || index}
                        name={mentorData.name}
                        batch={mentorData.batchData}
                        info={mentorData.info}
                        followers={mentorData.followers}
                    />
                ))}
        </div>
    );
}