import React, { FC, ReactElement, InputHTMLAttributes, ChangeEvent } from 'react'
import classNames from 'classnames'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Icon from '../Icon/icon'

type InputSize = 'lg' | 'sm'
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  /**是否禁用Input */
  disabled?: boolean;
  /**设置Input的尺寸 */
  size?: InputSize;
  /**添加Input图标 */
  icon?: IconProp;
  /**添加前缀 */
  prepend?: string | ReactElement;
  /**添加后缀 */
  append?: string | ReactElement;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<InputProps> = (props) => {
  const {
    disabled,
    size,
    icon,
    prepend,
    append,
    style,
    ...restProps
  } = props

  const classes = classNames('guo-input-wrapper', {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend,
  })
  const fixControlledValue = (value: any) => {
    if (typeof value === 'undefined' || value === null) return ''
    return value
  }
  if ('value' in props) {
    delete restProps.defaultValue
    restProps.value = fixControlledValue(props.value)
  }

  return (
    <div className={classes} style={style}>
      {prepend && <div className="guo-input-group-prepend">{prepend}</div>}
      {icon && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`} /></div>}
      <input
        className="guo-input-inner"
        disabled={disabled}
        {...restProps}
      />
      {append && <div className="guo-input-group-append">{append}</div>}
    </div>
  )
};

export default Input;