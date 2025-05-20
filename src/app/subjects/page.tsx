import Screen from "@/components/Screen";
import SubjectCard from "@/components/SubjectCard";
import Button from "@/components/UIButton";
import UIImage from "@/components/UIImage";
import UITitle from "@/components/UITitle";


export default async function Subjects({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    console.log("id", id)
    const data = await fetch(`${process.env.API_URL}/site/helpers/subjects`)
    const subjectsResponse = await data.json();
    const subjects = subjectsResponse?.data?.data;
    console.log("subjectsResponse", subjectsResponse);
    



    const subjectCards = subjects.map((subject: { id: string; name: string }) => (
        <SubjectCard key={subject.id}>
            <UIImage
                image="https://assets.api.uizard.io/api/cdn/stream/fccbc3a2-382d-4198-84e9-9926836acb82.png"
                styles={{
                    borderRadius: '100%',
                }}
            />
            <UITitle text={`${subject.name}`} />
            <Button label="View Details" href={`/subjects/${subject.id}`} />
        </SubjectCard>
    ))
    return (
        <Screen>
            {
                subjectCards
            }

        </Screen>
    )
}
