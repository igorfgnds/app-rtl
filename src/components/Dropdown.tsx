import { useState } from 'react';

interface IDropdown {
  title: string;
  options: string[];
  onSelect: (option: string) => void;
}

export default function Dropdown(props: IDropdown): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    props.onSelect(option);
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <button onClick={() => setIsOpen(!isOpen)}>{props.title}</button>

      {isOpen && (
        <div>
          <ul>
            {props.options.map((option, index) => (
              <li key={index} onClick={() => handleSelect(option)}>
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
