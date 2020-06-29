import React from 'react';
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuitem'

const App: React.FC = () => {
  return (
    <div className="App">
      <Menu defaultIndex={0} mode="vertical" onSelect={(index) => alert(index)}>
        <MenuItem index={0}>menu1</MenuItem>
        <MenuItem disabled index={1}>menu2</MenuItem>
        <MenuItem index={2}>menu3</MenuItem>
      </Menu>
    </div>
  );
};

export default App;
