
import Button from "@/components/UIButton";
import UIImage from "@/components/UIImage";
import UITitle from "@/components/UITitle";
import Screen from "@/components/Screen";
import SubjectCard from "@/components/SubjectCard";

export default async function page({ params }: { params: Promise<{ id: string }> }) {
  // get id from params
  const { id } = await params
  console.log("id", id)

  const subjects = [
    {
      id: 1,
      name: "Math",
    },
    {
      id: 2,
      name: "Science",
    },
    {
      id: 3,
      name: "English",
    },
    {
      id: 4,
      name: "Social Studies",
    },
    {
      id: 5,
      name: "History",
    },
  ];

  const subjectCards = subjects.map((subject) => (
    <SubjectCard key={subject.id}>
      <UIImage
        image="https://assets.api.uizard.io/api/cdn/stream/fccbc3a2-382d-4198-84e9-9926836acb82.png"
        styles={{
          borderRadius: '100%',
        }}
      />
      <UITitle text="Math" />
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
