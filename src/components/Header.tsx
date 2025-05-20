import React from 'react';

const styles = {
    Header: {
        width: '100%',
        height: '64px',
        backgroundColor: '#ffffff',
        boxShadow: '2px -2px 10px rgba(3,3,3,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0px 16px',
        borderBottom: '1px solid #f2f2f2',
        zIndex: 1000
    },
};

const Header = (props: { children: React.ReactNode }) => {
    return (
        <div style={styles.Header}>
            {props.children}
        </div>
    );
};

export default Header;