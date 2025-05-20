import Link from 'next/link';
import React from 'react';

const styles = {
    Text: {
        color: '#030303',
        fontSize: '16px',
        fontFamily: 'Palanquin',
        lineHeight: '24px',
    },
};

const defaultProps = {
    text: 'Home',
};

const HeaderLink = (props: { text?: string; href?: string }) => {
    return (
        <Link href={props.href ?? '/'} style={styles.Text}>
            {props.text ?? defaultProps.text}
        </Link>
    );
};

export default HeaderLink;