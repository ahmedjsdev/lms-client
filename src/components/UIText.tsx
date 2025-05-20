import React from 'react';

const styles = {
    Text: {
        color: '#030303',
        fontSize: '16px',
        fontFamily: 'Palanquin',
        lineHeight: '24px',
    },
};


const UIText = (props: { children?: React.ReactNode, styles?: React.CSSProperties }) => {
    return (
        <div style={{
            ...styles.Text,
            ...props.styles
        }}>
            {props.children}
        </div>
    );
};

export default UIText;