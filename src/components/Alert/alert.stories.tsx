import React from 'react'
import { storiesOf } from '@storybook/react'
import Alert from './alert'

const AlertComponent = () => (
  <div>
    <Alert message="Default alert" description="This is a description" closable />
    <Alert type="success" message="Success alert" closable />
    <Alert type="danger" message="Danger alert" description="This is a description." />
  </div>
)

storiesOf('Alert Component', module)
  .add('Alert', AlertComponent)