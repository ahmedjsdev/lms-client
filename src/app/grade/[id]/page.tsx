
import Button from "@/components/UIButton";
import UIImage from "@/components/UIImage";
import UITitle from "@/components/UITitle";
import Screen from "@/components/Screen";
import SubjectCard from "@/components/SubjectCard";

export default async function page({ params }: { params: Promise<{ id: string }> }) {
  // get id from params
  const { id } = await params;

  const data = await fetch(`${process.env.API_URL}/site/helpers/grades?id=${id}`, {cache: 'no-store'})
  const gradeResponse = await data.json();
  const subjects = gradeResponse?.data?.data[0]?.subjects;


  const subjectCards = subjects.map((subject: { id: string; name: string }) => (
    <SubjectCard key={subject.id}>
      <UIImage
        image="https://assets.api.uizard.io/api/cdn/stream/fccbc3a2-382d-4198-84e9-9926836acb82.png"
        styles={{
          borderRadius: '100%',
        }}
      />
      <UITitle text={subject.name} />
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
