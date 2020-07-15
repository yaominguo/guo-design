import React, { createContext, useState, FC } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuitem'

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectedIndex: string) => void

export interface MenuProps {
  /**默认开启的菜单项索引 */
  defaultIndex?: string;
  className?: string;
  /**菜单类型 */
  mode?: MenuMode;
  style?: React.CSSProperties;
  /**点击菜单项触发的回调函数 */
  onSelect?: SelectCallback;
  /**设置子菜单的默认打开（只在纵向模式下生效） */
  defaultOpenSubMenus?: string[];
}

interface IMenuContext {
  index: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}

export const MenuContext = createContext<IMenuContext>({ index: '0' })
/**
 * 为网站提供导航功能的菜单，支持横向和纵向两种模式，支持下拉菜单
 * ### 引用方法
 * ~~~js
 * import {Menu, MenuItem} from 'guo-design'
 * ~~~
 */
export const Menu: FC<MenuProps> = (props) => {
  const { className, mode, style, defaultIndex, onSelect, defaultOpenSubMenus, children } = props
  const [currentActive, setActive] = useState(defaultIndex)
  const classes = classNames('guo-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
  })
  const handleClick = (index: string) => {
    setActive(index)
    if (onSelect) {
      onSelect(index)
    }
  }
  const passedContext: IMenuContext = {
    index: currentActive || '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus,
  }
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, { index: index.toString() })
      } else {
        console.error('Warning: Menu has a child which is not a MenuItem or SubMenu component!')
      }
    })
  }
  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
};

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: [],
};

export default Menu;