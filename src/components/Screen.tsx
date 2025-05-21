import React from 'react';

const styles = {
    Screen: {
        backgroundColor: '#add8e6',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: '20px',
        flexWrap: 'wrap',
        padding: '20px',
    } as React.CSSProperties,
};

const Screen = (props: { children: React.ReactNode, styles?: React.CSSProperties }) => {
    return (
        <div style={{
            ...styles.Screen as React.CSSProperties,
            ...props.styles,
        }}>
            {props.children}
        </div>
    );
};

export default Screen;