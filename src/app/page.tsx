
import Button from "@/components/UIButton";
import GradeCard from "@/components/GradeCard";
import GradeImage from "@/components/UIImage";
import GradeTitle from "@/components/UITitle";
import Screen from "@/components/Screen";


export default async function Home() {
  const data = await fetch(`${process.env.API_URL}/site/helpers/grades`)
  const gradesResponse = await data.json();
  const grades = gradesResponse?.data?.data;



  const gradeCards = (grades || []).map((grade: { id: string; name: string; }) => (
    <GradeCard key={grade.id}>
      <GradeImage image="https://assets.api.uizard.io/api/cdn/stream/5b6ed5cf-f90a-4186-8b5d-e4e2cd9bb5cb.png" />
      <GradeTitle text={`${grade.name}`} />
      <Button label="Start" href={`/grade/${grade.id}`} />
    </GradeCard>
  ))



  return (
    <Screen>
      {
        gradeCards
      }
    </Screen>
  );
}
