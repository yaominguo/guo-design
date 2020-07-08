import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Button from './button'

const defaultButton = () => <Button onClick={action('clicked')}>Button</Button>
const buttonWithSize = () => (
  <div>
    <Button size="lg">LargeButton</Button>
    <Button size="sm">SmallButton</Button>
  </div>
)
const buttonWithType = () => (
  <div>
    <Button btnType="primary">PrimaryButton</Button>
    <Button btnType="danger">DangerButton</Button>
    <Button btnType="link" href="https://www.google.com">LinkButton</Button>
  </div>
)
storiesOf('Button Component', module)
  .add('默认 Button', defaultButton)
  .add('不同尺寸 Button', buttonWithSize)
  .add('不同类型 Button', buttonWithType)
