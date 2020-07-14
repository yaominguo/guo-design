import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Menu from './menu'
import MenuItem from './menuitem'

export const MenuComponent = () => (
  <Menu defaultIndex='0' mode="vertical" onSelect={(index) => action(`clicked ${index} item`)}>
    <MenuItem>menu1</MenuItem>
    <MenuItem disabled>menu2</MenuItem>
    <MenuItem>menu3</MenuItem>
  </Menu>
)

storiesOf('Menu Component', module)
  .add('Menu', MenuComponent)