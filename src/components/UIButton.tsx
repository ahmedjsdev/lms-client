import Link from 'next/link';
import React from 'react';

const styles = {
    Button: {
        cursor: 'pointer',
        height: '36px',
        padding: '8px 12px',
        border: '0',
        boxSizing: 'border-box',
        borderRadius: '9999px',
        backgroundColor: '#ff784b',
        color: '#ffffff',
        fontSize: '14px',
        fontFamily: 'Palanquin',
        fontWeight: 700,
        lineHeight: '20px',
        outline: 'none',
        width: '70%',
        textAlign: 'center',
        textDecoration: 'none',
        boxShadow: '0px 0px 9px rgba(3,3,3,0.1)',
    },
};

const defaultProps = {
    label: 'Start',
};

const Button = (props: { label: string; onClick?: () => void; href?: string; styles?: React.CSSProperties }) => {
    return (
        <Link href={props.href || '#'} style={{
            ...styles.Button as React.CSSProperties,
            ...props.styles,
        }} onClick={props.onClick}>
            {props.label ?? defaultProps.label}
        </Link>
    );
};

export default Button;