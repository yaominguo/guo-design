import React from 'react';
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuitem'
import SubMenu from './components/Menu/subMenu'

const App: React.FC = () => {
  return (
    <div className="App">
      <Menu defaultOpenSubMenus={['0']} defaultIndex='0' mode="vertical" onSelect={(index) => alert(index)}>
        <SubMenu title="sub-menu">
          <MenuItem>menu1</MenuItem>
          <MenuItem disabled>menu2</MenuItem>
        </SubMenu>
        <MenuItem>menu3</MenuItem>
      </Menu>
    </div>
  );
};

export default App;
