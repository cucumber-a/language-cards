import React from 'react';
import { Example } from '../CardsGenerator/CardsGenerator';

type ExampleProps = {
  example: Example;
}

export function WordExample({ example }: ExampleProps) {
  return (
    <div className='example'>
      <div className='example__original'>{example.example}</div>
      <div className='example__translation'>{example.translation}</div>
    </div>
  );
}