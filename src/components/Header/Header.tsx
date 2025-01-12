import React from 'react';
import './Header.scss';

type HeaderProps = {
    version: string;
}

export function Header({ version }: HeaderProps) {
    return (
        <div className='header'>
            <div className='version'>
                {version}
            </div>
        </div>
    )
}
