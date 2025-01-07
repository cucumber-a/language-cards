import React from 'react';
import './App.css';
import data from './data/words.json'

type TextInputProps = {
  value: string;
  onUpdate: React.Dispatch<React.SetStateAction<string>>,
}

export const useComponentDidRenderedEffect = (callback: () => void) => {
  React.useEffect(() => {
    callback();
  }, []);

  return 22;
}

// debounce

const TextInput = ({ value, onUpdate }: TextInputProps) => {
  const onChange = React.useMemo<React.ChangeEventHandler<HTMLInputElement>>(() => {
    return (event) => {
      onUpdate((prevValue) => {
        if (true) return event.target.value + "1"

      })
    };
  }, [onUpdate]);

  React.useEffect(() => {
    return () => {
      "qeqweqeqweqwe"
    }
  }, []);

  const result = useComponentDidRenderedEffect(() => {});

  return (
    <div>
      wqewqewq
      <input value={value} onChange={onChange} />
      qweqew
    </div>
  )
}

function App() {
  const [value, setValue] = React.useState(() => 'initialn Value');

  return (
    <div className="App">
      <TextInput value={value} onUpdate={setValue} />
    </div>
  );
}

export default App;
