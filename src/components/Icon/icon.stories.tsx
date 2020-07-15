import React from 'react'
import { storiesOf } from '@storybook/react'
import Icon from './icon'

const IconComponent = () => (
  <div>
    <Icon icon="music" />
    <Icon icon="home" theme="success" />
    <Icon icon="plus" theme="danger" />
  </div>
)

storiesOf('Icon Component', module)
  .add('Icon', IconComponent)