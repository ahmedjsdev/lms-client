
import Button from "@/components/UIButton";
import GradeCard from "@/components/GradeCard";
import GradeImage from "@/components/UIImage";
import GradeTitle from "@/components/UITitle";
import Screen from "@/components/Screen";


export default function Home() {
  const grades = [1, 2, 3, 4, 5,6,7,8,9]; // Array of grades from 1 to 12
  const gradeCards = grades.map((grade) => (
    <GradeCard key={grade}>
      <GradeImage image="https://assets.api.uizard.io/api/cdn/stream/5b6ed5cf-f90a-4186-8b5d-e4e2cd9bb5cb.png" />
      <GradeTitle text={`Grade ${grade}`} />
      <Button label="Start" href={`/grade/${grade}`} />
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
