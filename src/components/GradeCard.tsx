import React from 'react';

const styles = {
    Card: {
        top: '275px',
        left: '72px',
        width: '300px',
        height: '350px',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0px 0px 9px rgba(3,3,3,0.1)',
        display: 'flex',
        flexDirection: 'column' as React.CSSProperties['flexDirection'],
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
    } as React.CSSProperties,
};

const GradeCard = ({ children }: { children: React.ReactNode }) => {
    return (
        <div style={styles.Card}>
            {children}
        </div>
    );
};

export default GradeCard;