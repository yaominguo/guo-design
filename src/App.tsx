import React from 'react';
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuitem'

const App: React.FC = () => {
  return (
    <div className="App">
      <Menu defaultIndex={0} mode="vertical" onSelect={(index) => alert(index)}>
        <MenuItem>menu1</MenuItem>
        <MenuItem disabled>menu2</MenuItem>
        <MenuItem>menu3</MenuItem>
      </Menu>
    </div>
  );
};

export default App;
