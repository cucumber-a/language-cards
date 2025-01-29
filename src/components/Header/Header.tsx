import React from 'react';
import './Header.scss';
import { Text } from '@gravity-ui/uikit';

type HeaderProps = {
    version: string;
}

export function Header({ version }: HeaderProps) {
    return (
        <div className='header'>
            <Text color="secondary">{version}</Text>
        </div>
    )
}
