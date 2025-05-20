
import Card from "@/components/Card";
import LessonSubjectLabel from "@/components/LessonSubjectLabel";
import Screen from "@/components/Screen";
import React from "react";
import UIImage from "@/components/UIImage";
import UITitle from "@/components/UITitle";
import UIButton from "@/components/UIButton";


const styles = {
    Screen: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: '20px',
        backgroundColor: '#fff',
    },
    CardImage: {
        width: '65px',
        height: '65px',
    },
    CardContent: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    LeftSideContent: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
    },
    CardTitle: { textAlign: 'left' as const, fontSize: '16px' }
}

export default async function Subjects({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const data = await fetch(`${process.env.API_URL}/site/helpers/subjects?id=${id}`)
    const subjectsResponse = await data.json();
    const lessons = subjectsResponse?.data?.data[0]?.lessons;

    const lessonCards = lessons.map((lesson: { id: string; title: string }) => (
        <Card key={lesson.id}>
            <div style={styles.CardContent}>
                <div style={styles.LeftSideContent}>
                    <UIImage styles={styles.CardImage} />
                    <UITitle text={`${lesson.title}`} styles={styles.CardTitle} />
                </div>

                <UIButton
                    label="Go"
                    styles={{ width: 'auto' }}
                    href={`/subjects/${id}/${lesson.id}`}
                />
            </div>
        </Card>
    ))

    return (
        <Screen styles={styles.Screen as React.CSSProperties}>
            <LessonSubjectLabel />
            {
                lessonCards
            }

        </Screen>
    );
}


