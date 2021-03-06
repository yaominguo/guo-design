import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Upload, UploadFile } from './upload'

const defaultFileList: UploadFile[] = [
  { uid: '111', size: 1234, name: '1.md', status: 'uploading', percent: 50 },
  { uid: '222', size: 1234, name: '2.md', status: 'success', percent: 100 },
  { uid: '333', size: 1234, name: '3.md', status: 'error', percent: 50 },
]

// const renameFileName = (file: File) => {
//   const newFile = new File([file], 'new_name.png', { type: file.type })
//   return Promise.resolve(newFile)
// }
// const checkFileSize = (file: File) => {
//   if (Math.round(file.size / 1024) > 1000) {
//     alert('file too big')
//     return false
//   }
//   return renameFileName(file)
// }
const SimpleUpload = () => {
  return (
    <Upload
      // beforeUpload={checkFileSize}
      action="https://jsonplaceholder.typicode.com/posts/"
      // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      onProgress={action('progress')}
      onSuccess={action('success')}
      onError={action('error')}
      onChange={action('changed')}
      defaultFileList={defaultFileList}
      name="fileName"
      data={{ 'key': 'value' }}
      headers={{ 'X-Powered-By': 'Guo' }}
      accept=".png"
      multiple
      drag
    />
  )
}

storiesOf('Upload Component', module)
  .add('Upload', SimpleUpload)