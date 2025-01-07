import React from 'react';
import './CheckboxInput.scss'

type CheckboxInputProps = {
  label: string;
  value: boolean;
  onUpdate: (value: boolean) => void;
}

export function CheckboxInput({ label, value, onUpdate }: CheckboxInputProps) {

  const onChange = React.useMemo<React.ChangeEventHandler<HTMLInputElement>>(() => {
    return (event) => onUpdate(event.target.checked);
  }, [onUpdate]);

  return (
    <div className='checkbox'>
      <input type="checkbox"
             className='checkbox__checkbox'
             onChange={onChange}
             id={label}
             name={label}
             checked={value} />

      <label className='checkbox__label' htmlFor={label}>{label}</label>
    </div>
  )
}