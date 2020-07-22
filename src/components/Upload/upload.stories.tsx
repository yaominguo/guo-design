import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Upload } from './upload'

const renameFileName = (file: File) => {
  const newFile = new File([file], 'new_name.png', { type: file.type })
  return Promise.resolve(newFile)
}
const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 1000) {
    alert('file too big')
    return false
  }
  return renameFileName(file)
}
const SimpleUpload = () => {
  return (
    <Upload
      action="https://jsonplaceholder.typicode.com/posts/"
      onProgress={action('progress')}
      onSuccess={action('success')}
      onError={action('error')}
      onChange={action('changed')}
      beforeUpload={checkFileSize}
    />
  )
}

storiesOf('Upload Component', module)
  .add('Upload', SimpleUpload)