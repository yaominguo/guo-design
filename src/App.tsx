import React from 'react';
import Icon from './components/Icon/icon'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

const App: React.FC = () => {
  return (
    <div className="App">
      <Icon icon="arrow-right" theme="primary" size="10x" />
    </div>
  );
};

export default App;
