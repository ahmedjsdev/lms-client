const styles = {
    Text: {
        color: '#030303',
        fontSize: '24px',
        fontFamily: 'Palanquin',
        fontWeight: 700,
        lineHeight: '32px',
        textAlign: 'center',
    },
};

const defaultProps = {
    text: 'Math Lessons',
};



const LessonSubjectLabel = (props: { text?: string }) => {
    return (
        <div style={styles.Text as React.CSSProperties}>
            {props.text ?? defaultProps.text}
        </div>
    );
};

export default LessonSubjectLabel;