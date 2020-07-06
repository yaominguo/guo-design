import React from 'react';
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuitem'
import SubMenu from './components/Menu/subMenu'
import Alert from './components/Alert/alert'

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
      <Alert message="Default alert" description="This is a description" closable />
      <Alert type="success" message="Success alert" closable />
      <Alert type="danger" message="Danger alert" description="This is a description." />
    </div>
  );
};

export default App;
