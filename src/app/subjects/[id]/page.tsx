
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


    console.log("PARAMS ID", id);

    const lessons = [
        { id: 1, name: 'Addition' },
        { id: 2, name: 'Subtraction' },
        { id: 3, name: 'Multiplication' },
        { id: 4, name: 'Division' },
    ];

    const lessonCards = lessons.map((lesson) => (
        <Card key={lesson.id}>
            <div style={styles.CardContent}>
                <div style={styles.LeftSideContent}>
                    <UIImage styles={styles.CardImage} />
                    <UITitle text={`Lesson ${lesson.id}: ${lesson.name}`} styles={styles.CardTitle} />
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


