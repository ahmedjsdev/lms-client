import React from 'react'
import Logo from './Logo';
import Header from './Header';
import HeaderLink from './HeaderLink';
import Link from 'next/link';

const styles = {
    navbar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'end',
        alignItems: 'center',
        padding: '0px 16px',
        gap: '16px',
    },
};

export default function Navbar() {
    return (
        <Header>
            <Link href={'/'}>
                <Logo />
            </Link>
            <div style={styles.navbar as React.CSSProperties}>
                <HeaderLink text='Home' href="/" />
                <HeaderLink text='Subjects' href="/subjects" />
            </div>
        </Header>
    )
}
