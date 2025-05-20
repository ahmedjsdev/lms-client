'use client';
import React, { useEffect, useState } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Screen from "@/components/Screen";
import UITitle from "@/components/UITitle";
import UIImage from "@/components/UIImage";
import UIButton from "@/components/UIButton";
import Card from '@/components/Card';
import UIText from '@/components/UIText';
import { useParams } from 'next/navigation';

const styles = {
    Screen: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: '20px',
        backgroundColor: '#fff',
        flexFlow: 'column'
    } as React.CSSProperties,
    backButton: {
        padding: '8px 24px',
        borderRadius: '20px',
        backgroundColor: 'transparent',
        boxShadow: 'none',
        border: '1px solid #333',
        color: '#333',
        width: 'auto',
    } as React.CSSProperties,
    layout: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        gap: '20px',
    } as React.CSSProperties,
    quizContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '100%',
    } as React.CSSProperties,
    quizOption: {
        width: '100%',
        padding: '15px',
        borderRadius: '10px',
        border: '2px solid #e0e0e0',
        backgroundColor: 'white',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
    } as React.CSSProperties,
    selectedOption: {
        backgroundColor: '#FF7F50',
        color: 'white',
        border: '2px solid #FF7F50',
    } as React.CSSProperties,
    letterBox: {
        width: '50px',
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF7F50',
        borderRadius: '10px',
        color: 'white',
        fontSize: '24px',
        cursor: 'pointer',
        margin: '5px',
        transition: 'all 0.3s ease',
    } as React.CSSProperties,
    answerContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        marginTop: '20px',
        minHeight: '60px',
        padding: '10px',
        backgroundColor: '#f5f5f5',
        borderRadius: '10px',
    } as React.CSSProperties,
    emptySlot: {
        width: '50px',
        height: '50px',
        border: '2px dashed #FF7F50',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    } as React.CSSProperties,
    dragHandle: {
        width: '24px',
        height: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF7F50',
        borderRadius: '50%',
        color: 'white',
        marginRight: '10px',
        cursor: 'grab',
        fontSize: '18px',
    } as React.CSSProperties,
    orderingItem: {
        padding: '15px',
        backgroundColor: '#f5f5f5',
        borderRadius: '10px',
        marginBottom: '10px',
        cursor: 'grab',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        userSelect: 'none',
        transition: 'all 0.3s ease',
        width: '100%',
        border: '2px solid transparent',
        fontSize: '16px',
        position: 'relative',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        '&:hover': {
            backgroundColor: '#f0f0f0',
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        },
        '&:active': {
            cursor: 'grabbing',
            backgroundColor: '#e8e8e8',
            transform: 'translateY(0)',
        },
    } as React.CSSProperties,
    wordScrambleContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '10px',
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
    } as React.CSSProperties,
    successMessage: {
        textAlign: 'center',
        color: '#4CAF50',
        fontSize: '20px',
        fontWeight: 'bold',
        marginTop: '20px',
        padding: '15px',
        backgroundColor: '#E8F5E9',
        borderRadius: '10px',
        animation: 'fadeIn 0.5s ease-in',
    } as React.CSSProperties,
    quizButtonContainer: {
        display: 'flex',
        gap: '10px',
        marginBottom: '20px',
        flexWrap: 'wrap',
        justifyContent: 'center',
    } as React.CSSProperties,
};

const SortableItem = ({ id, content }: { id: string; content: string }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const style = {
        ...styles.orderingItem,
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <div style={styles.dragHandle}>≡</div>
            <span>{content}</span>
        </div>
    );
};

export default function LessonDetails() {
    const {lessonId} = useParams()
    console.log("lessonId", lessonId);
    
    const [currentQuizType, setCurrentQuizType] = useState('multiple');
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [orderItems, setOrderItems] = useState([
        { id: 'item-1', content: 'Evaporation' },
        { id: 'item-2', content: 'Condensation' },
        { id: 'item-3', content: 'Precipitation' },
        { id: 'item-4', content: 'Collection' }
    ]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setOrderItems((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over?.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const [multipleChoiceCorrect, setMultipleChoiceCorrect] = useState<boolean | null>(null);
    const [trueFalseCorrect, setTrueFalseCorrect] = useState<boolean | null>(null);
    const [orderingCorrect, setOrderingCorrect] = useState<boolean | null>(null);

    // Reset states when changing quiz type
    useEffect(() => {
        setMultipleChoiceCorrect(null);
        setTrueFalseCorrect(null);
        setOrderingCorrect(null);
        setSelectedOption(null);
    }, [currentQuizType]);

    useEffect(() => {
        const fetchLessonData = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/site/lessons?id=${lessonId}`);
            const lessonResponse = await response.json();
            console.log("lessonResponse", lessonResponse);
        }
        fetchLessonData()
    }, [lessonId])

    const multipleChoiceQuiz = (
        <div style={styles.quizContainer}>
            <UITitle text="Quiz: What is Precipitation?" />
            {[
                'Rain, snow, sleet, or hail that falls to the ground',
                'The process of water turning into vapor',
                'Water flowing into rivers and oceans',
                'Water absorbed by plants'
            ].map((option, index) => (
                <button
                    key={index}
                    style={{
                        ...styles.quizOption,
                        ...(selectedOption === index ? styles.selectedOption : {})
                    }}
                    onClick={() => {
                        setSelectedOption(index);
                        setMultipleChoiceCorrect(null); // Reset feedback when selecting new option
                    }}
                >
                    {option}
                </button>
            ))}
            <UIButton 
                label="Check Answer"
                onClick={() => {
                    if (selectedOption === 0) {
                        setMultipleChoiceCorrect(true);
                    } else {
                        setMultipleChoiceCorrect(false);
                    }
                }}
                styles={{
                    ...styles.backButton,
                    backgroundColor: '#FF7F50',
                    color: 'white',
                    border: 'none',
                    marginTop: '20px'
                }}
            />
            {multipleChoiceCorrect === true && (
                <div style={styles.successMessage}>
                    Correct! Well done! 🎉
                </div>
            )}
            {multipleChoiceCorrect === false && (
                <div style={{
                    ...styles.successMessage,
                    backgroundColor: '#FFEBEE',
                    color: '#D32F2F'
                }}>
                    Try again! Think about what precipitation means.
                </div>
            )}
        </div>
    );

    const trueFalseQuiz = (
        <div style={styles.quizContainer}>
            <UITitle text="True or False: Water vapor is invisible." />
            {['True', 'False'].map((option, index) => (
                <button
                    key={index}
                    style={{
                        ...styles.quizOption,
                        ...(selectedOption === index ? styles.selectedOption : {})
                    }}
                    onClick={() => {
                        setSelectedOption(index);
                        setTrueFalseCorrect(null); // Reset feedback when selecting new option
                    }}
                >
                    {option}
                </button>
            ))}
            <UIButton 
                label="Check Answer"
                onClick={() => {
                    if (selectedOption === 0) {
                        setTrueFalseCorrect(true);
                    } else {
                        setTrueFalseCorrect(false);
                    }
                }}
                styles={{
                    ...styles.backButton,
                    backgroundColor: '#FF7F50',
                    color: 'white',
                    border: 'none',
                    marginTop: '20px'
                }}
            />
            {trueFalseCorrect === true && (
                <div style={styles.successMessage}>
                    Correct! Water vapor is indeed invisible! 🎉
                </div>
            )}
            {trueFalseCorrect === false && (
                <div style={{
                    ...styles.successMessage,
                    backgroundColor: '#FFEBEE',
                    color: '#D32F2F'
                }}>
                    Try again! Think about whether you can see water vapor in the air.
                </div>
            )}
        </div>
    );

    const orderingQuiz = (
        <div style={styles.quizContainer}>
            <UITitle text="Order the steps of the water cycle:" />
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={orderItems.map(item => item.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {orderItems.map((item) => (
                        <SortableItem key={item.id} {...item} />
                    ))}
                </SortableContext>
            </DndContext>
            <UIButton 
                label="Check Order"
                onClick={() => {
                    const correctOrder = ['Evaporation', 'Condensation', 'Precipitation', 'Collection'];
                    const currentOrder = orderItems.map(item => item.content);
                    
                    if (JSON.stringify(currentOrder) === JSON.stringify(correctOrder)) {
                        setOrderingCorrect(true);
                    } else {
                        setOrderingCorrect(false);
                    }
                }}
                styles={{
                    ...styles.backButton,
                    backgroundColor: '#FF7F50',
                    color: 'white',
                    border: 'none',
                    marginTop: '20px'
                }}
            />
            {orderingCorrect === true && (
                <div style={styles.successMessage}>
                    Perfect! You got the water cycle steps in the right order! 🎉
                </div>
            )}
            {orderingCorrect === false && (
                <div style={{
                    ...styles.successMessage,
                    backgroundColor: '#FFEBEE',
                    color: '#D32F2F'
                }}>
                    Not quite right. Remember, water first evaporates, then condenses in clouds, before falling as precipitation and being collected.
                </div>
            )}
        </div>
    );

    const [scrambledWord] = useState([
        { id: 'c1', letter: 'C' },
        { id: 'y1', letter: 'Y' },
        { id: 'c2', letter: 'C' },
        { id: 'l1', letter: 'L' },
        { id: 'e1', letter: 'E' }
    ]);
    const [selectedLetters, setSelectedLetters] = useState<Array<{ id: string, letter: string }>>([]);
    const [isCorrect, setIsCorrect] = useState(false);

    const handleLetterClick = (id: string, letter: string) => {
        if (selectedLetters.find(item => item.id === id)) {
            // Remove letter from selected
            setSelectedLetters(selectedLetters.filter(item => item.id !== id));
        } else {
            // Add letter to selected
            setSelectedLetters([...selectedLetters, { id, letter }]);

            // Check if word is complete and correct
            const newWord = [...selectedLetters, { id, letter }].map(item => item.letter).join('');
            if (newWord === 'CYCLE') {
                setIsCorrect(true);
            }
        }
    };

    const wordScrambleQuiz = (
        <div style={styles.quizContainer}>
            <UITitle text="Unscramble the word" />

            {/* Answer slots */}
            <div style={styles.answerContainer}>
                {Array(5).fill(null).map((_, index) => (
                    <div
                        key={`slot-${index}`}
                        style={{
                            ...styles.emptySlot,
                            backgroundColor: selectedLetters[index] ? '#FF7F50' : 'transparent',
                            color: selectedLetters[index] ? 'white' : 'transparent',
                        }}
                    >
                        {selectedLetters[index]?.letter || '_'}
                    </div>
                ))}
            </div>

            {/* Scrambled letters */}
            <div style={styles.wordScrambleContainer}>
                {scrambledWord.map(({ id, letter }) => (
                    <div
                        key={id}
                        style={{
                            ...styles.letterBox,
                            opacity: selectedLetters.find(item => item.id === id) ? 0.5 : 1,
                            transform: selectedLetters.find(item => item.id === id) ? 'scale(0.9)' : 'scale(1)',
                        }}
                        onClick={() => handleLetterClick(id, letter)}
                    >
                        {letter}
                    </div>
                ))}
            </div>

            {isCorrect && (
                <div style={styles.successMessage}>
                    Correct! Well done! 🎉
                </div>
            )}
        </div>
    );

    const [fillInBlanksAnswers, setFillInBlanksAnswers] = useState<string[]>(Array(3).fill(''));
    const [fillInBlanksCorrect, setFillInBlanksCorrect] = useState<boolean | null>(null);

    const fillInBlanksQuiz = (
        <div style={styles.quizContainer}>
            <UITitle text="Fill in the blanks about the Water Cycle" />
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span>When water heats up, it turns into water vapor through</span>
                    <input
                        type="text"
                        value={fillInBlanksAnswers[0]}
                        onChange={(e) => {
                            const newAnswers = [...fillInBlanksAnswers];
                            newAnswers[0] = e.target.value;
                            setFillInBlanksAnswers(newAnswers);
                            setFillInBlanksCorrect(null);
                        }}
                        style={{
                            padding: '8px',
                            borderRadius: '5px',
                            border: '2px solid #FF7F50',
                            width: '150px',
                        }}
                        placeholder="Type your answer"
                    />
                    <span>.</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span>Water vapor cools and forms clouds through</span>
                    <input
                        type="text"
                        value={fillInBlanksAnswers[1]}
                        onChange={(e) => {
                            const newAnswers = [...fillInBlanksAnswers];
                            newAnswers[1] = e.target.value;
                            setFillInBlanksAnswers(newAnswers);
                            setFillInBlanksCorrect(null);
                        }}
                        style={{
                            padding: '8px',
                            borderRadius: '5px',
                            border: '2px solid #FF7F50',
                            width: '150px',
                        }}
                        placeholder="Type your answer"
                    />
                    <span>.</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span>Water falls from clouds as</span>
                    <input
                        type="text"
                        value={fillInBlanksAnswers[2]}
                        onChange={(e) => {
                            const newAnswers = [...fillInBlanksAnswers];
                            newAnswers[2] = e.target.value;
                            setFillInBlanksAnswers(newAnswers);
                            setFillInBlanksCorrect(null);
                        }}
                        style={{
                            padding: '8px',
                            borderRadius: '5px',
                            border: '2px solid #FF7F50',
                            width: '150px',
                        }}
                        placeholder="Type your answer"
                    />
                    <span>.</span>
                </div>
            </div>

            <UIButton 
                label="Check Answers"
                onClick={() => {
                    const correctAnswers = ['evaporation', 'condensation', 'precipitation'];
                    const isCorrect = fillInBlanksAnswers.every((answer, index) => 
                        answer.toLowerCase().trim() === correctAnswers[index]
                    );
                    setFillInBlanksCorrect(isCorrect);
                }}
                styles={{
                    ...styles.backButton,
                    backgroundColor: '#FF7F50',
                    color: 'white',
                    border: 'none',
                    marginTop: '20px'
                }}
            />

            {fillInBlanksCorrect === true && (
                <div style={styles.successMessage}>
                    Perfect! You understand the water cycle processes! 🎉
                </div>
            )}
            {fillInBlanksCorrect === false && (
                <div style={{
                    ...styles.successMessage,
                    backgroundColor: '#FFEBEE',
                    color: '#D32F2F'
                }}>
                    Try again! Remember the three main processes: evaporation, condensation, and precipitation.
                </div>
            )}
        </div>
    );



    return (
        <Screen styles={styles.Screen}>
            <UIButton
                label="Back"
                styles={styles.backButton}
            />

            <div style={styles.layout}>
                <Card>
                    <UITitle text="The Water Cycle" />
                    <UIText>
                        The water cycle is the journey that water takes as it moves from the land to the sky and back again. It includes processes such as evaporation, condensation, and precipitation.
                    </UIText>
                    <UIImage image='https://assets.api.uizard.io/api/cdn/stream/ec5b329d-63a9-4e12-8dba-7039198243e3.png'
                        styles={{
                            width: '100%',
                            height: '600px',
                            borderRadius: '10px',
                            marginTop: '10px',
                        }} />
                </Card>

                <Card>
                    <div style={styles.quizButtonContainer}>
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                            <UIButton
                                label="Multiple Choice"
                                onClick={() => setCurrentQuizType('multiple')}
                                styles={{
                                    ...styles.backButton,
                                    backgroundColor: currentQuizType === 'multiple' ? '#FF7F50' : 'transparent',
                                    color: currentQuizType === 'multiple' ? 'white' : '#333',
                                }}
                            />
                            <UIButton
                                label="True/False"
                                onClick={() => setCurrentQuizType('truefalse')}
                                styles={{
                                    ...styles.backButton,
                                    backgroundColor: currentQuizType === 'truefalse' ? '#FF7F50' : 'transparent',
                                    color: currentQuizType === 'truefalse' ? 'white' : '#333',
                                }}
                            />
                            <UIButton
                                label="Ordering"
                                onClick={() => setCurrentQuizType('ordering')}
                                styles={{
                                    ...styles.backButton,
                                    backgroundColor: currentQuizType === 'ordering' ? '#FF7F50' : 'transparent',
                                    color: currentQuizType === 'ordering' ? 'white' : '#333',
                                }}
                            />
                            <UIButton
                                label="Word Scramble"
                                onClick={() => setCurrentQuizType('scramble')}
                                styles={{
                                    ...styles.backButton,
                                    backgroundColor: currentQuizType === 'scramble' ? '#FF7F50' : 'transparent',
                                    color: currentQuizType === 'scramble' ? 'white' : '#333',
                                }}
                            />
                            <UIButton
                                label="Fill in Blanks"
                                onClick={() => setCurrentQuizType('fillblanks')}
                                styles={{
                                    ...styles.backButton,
                                    backgroundColor: currentQuizType === 'fillblanks' ? '#FF7F50' : 'transparent',
                                    color: currentQuizType === 'fillblanks' ? 'white' : '#333',
                                }}
                            />
                        </div>

                        {currentQuizType === 'multiple' && multipleChoiceQuiz}
                        {currentQuizType === 'truefalse' && trueFalseQuiz}
                        {currentQuizType === 'ordering' && orderingQuiz}
                        {currentQuizType === 'scramble' && wordScrambleQuiz}
                        {currentQuizType === 'fillblanks' && fillInBlanksQuiz}
                    </div>
                </Card>
            </div>
        </Screen>
    );
}