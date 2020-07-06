import React, { useState } from 'react'
import classNames from 'classnames'
import Icon from '../Icon/icon'

export type AlertType = 'primary' | 'success' | 'danger' | 'info'

export interface AlertProps {
  message: string;
  type?: AlertType;
  description?: string;
  closable?: boolean;
}

const Alert: React.FC<AlertProps> = (props) => {
  const [visiable, setVisiable] = useState(true)
  const { message, type = 'primary', description, closable = false } = props
  const classes = classNames('guo-alert', {
    [`guo-alert-${type}`]: type,
    'none': !visiable,
  })
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setVisiable(false)
  }
  return (
    <div className={classes} data-testid="test-alert">
      {closable ? <Icon onClick={handleClick} icon="times" className="close-btn" /> : null}
      {description ? <div><h5>{message}</h5><p>{description}</p></div> : message}
    </div>
  )
}

export default Alert