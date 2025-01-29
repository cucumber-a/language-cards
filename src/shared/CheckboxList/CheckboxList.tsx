import React from 'react';
import './CheckboxList.scss';
import { Checkbox, ArrowToggle, Button } from '@gravity-ui/uikit';

type ChecboxListProps<T extends string> = {
    options: { value: boolean, label: T }[];
    onUpdate: (state: { value: boolean, label: T }[]) => void;
}

type SelectAllState = 'checked' | 'unchecked' | 'indeterminate';

function calculateAllState<T>(options: { value: boolean, label: T }[]): SelectAllState {
    let selectedOptionsLength = 0;
    options.forEach((option) => selectedOptionsLength += Number(option.value));
    if (options.length === selectedOptionsLength) return 'checked';
    if (selectedOptionsLength) return 'indeterminate';
    return 'unchecked';
}

export function CheckboxList<T extends string>({ options, onUpdate }: ChecboxListProps<T>) {
    const [subListVisible, setSubListVisible] = React.useState(true);
    const selectAllState = calculateAllState(options);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name as T;
        const checked = event.target.checked;
        onUpdate(options.map((option) => option.label !== name ? option : ({ label: name, value: checked })));
    }
    const hangeSelectAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        onUpdate(options.map((option) => ({ label: option.label, value: checked })));
    }

    return (
        <div className='checkbox-list'>
            <ul className='root-ul'>
                <li>
                    <Checkbox size="l"
                        name="all"
                        onChange={hangeSelectAllChange}
                        checked={selectAllState === 'checked'}
                        indeterminate={selectAllState === 'indeterminate'}>
                        Select all
                    </Checkbox>
                    <Button view="flat" onClick={() => setSubListVisible(!subListVisible)}>
                        <ArrowToggle direction={subListVisible ? 'top' : 'bottom'}></ArrowToggle>
                    </Button>
                </li>
                <li className={`root-li ${subListVisible ? 'hidden' : ''}`}>
                    <ul>
                        {options.map((option) => (
                            <li key={option.label}>
                                <Checkbox size="l"
                                    name={option.label}
                                    onChange={handleChange}
                                    checked={option.value}>
                                    {option.label}
                                </Checkbox>
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>
        </div>
    )
}
