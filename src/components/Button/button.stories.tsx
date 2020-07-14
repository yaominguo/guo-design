import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Button from './button'

const ButtonComponent = () => (
  <div>
    <Button size="lg" onClick={action('lg clicked')}>LargeButton</Button>
    <Button size="sm" btnType="primary" onClick={action('sm clicked')}>SmallPrimaryButton</Button>
    <Button btnType="danger">DangerButton</Button>
    <Button btnType="link" href="https://www.google.com">LinkButton</Button>
  </div>
)

storiesOf('Button Component', module)
  .add('Button', ButtonComponent)
