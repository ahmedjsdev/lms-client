import React from 'react';

const styles = {
    Text: {
        color: '#030303',
        fontSize: '24px',
        fontFamily: 'Palanquin',
        fontWeight: 700,
        letterSpacing: '-0.6px',
        lineHeight: '32px',
    },
};

const defaultProps = {
    text: 'Logo',
};

const Logo = (props: { text?: string; }) => {
    return (
        <p style={styles.Text}>
            {props.text ?? defaultProps.text}
        </p>
    );
};

export default Logo;