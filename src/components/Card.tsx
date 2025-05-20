import React from 'react';

const styles = {
    Card: {
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0px 0px 9px rgba(3,3,3,0.1)',
        padding: '20px',
        width: '100%'
    },
};

const Card = (props: { children?: React.ReactNode, styles?: React.CSSProperties }) => {
    return (
        <div style={{
            ...styles.Card,
            ...props.styles,
        }}>
            {props.children}
        </div>
    );
};

export default Card;