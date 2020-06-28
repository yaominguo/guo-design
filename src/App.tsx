import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Button className="custom" size={ButtonSize.Small}>Hello</Button>
        <Button btnType={ButtonType.Link} target="_blank" href="http://www.baidu.com">Hello</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>Hello</Button>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
