import React, { FC, useRef, ChangeEvent, useState } from 'react'
import axios from 'axios'
import Button from '../Button/button'
import UploadList from './uploadList'

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'
export interface UploadFile {
  /**上传文件的uid */
  uid: string;
  /**上传文件的尺寸 */
  size: number;
  /**上传文件的名称 */
  name: string;
  /**上传文件的状态 */
  status?: UploadFileStatus;
  /**上传文件的进度 */
  percent?: number;
  /**上传文件的原始文件信息 */
  raw?: File;
  /**上传成功的返回值*/
  response?: any;
  /**上传失败的返回信息 */
  error?: any;
}
export interface UploadProps {
  /**上传的地址 */
  action: string;
  /**默认文件列表 */
  defaultFileList?: UploadFile[];
  /**生命周期 上传前 */
  beforeUpload?: (file: File) => boolean | Promise<File>,
  /**生命周期 上传中 */
  onProgress?: (percentage: number, file: File) => void;
  /**生命周期 上传成功 */
  onSuccess?: (data: any, file: File) => void;
  /**生命周期 上传失败 */
  onError?: (err: any, file: File) => void;
  /**上传状态变化的回调函数 */
  onChange?: (file: File) => void;
  /**删除文件回调函数 */
  onRemove?: (file: UploadFile) => void;
  /**请求头 */
  headers?: { [key: string]: any };
  /**文件名 */
  name?: string;
  /**请求参数数据 */
  data?: { [key: string]: any };
  /**是否携带cookie */
  withCredentials?: boolean;
  /**限制上传的文件类型 */
  accept?: string;
  /**是否可以多选 */
  multiple?: boolean;
}
export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    defaultFileList,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
    onRemove,
    name,
    headers,
    data,
    withCredentials,
    accept,
    multiple,
  } = props
  const fileInput = useRef<HTMLInputElement>(null)
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])
  const updateFileList = (updateFile: UploadFile, updateObject: Partial<UploadFile>) => {
    setFileList(prevList => {
      return prevList.map(file => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObject }
        } else {
          return file
        }
      })
    })
  }
  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click()
    }
  }
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    if (!files) return
    uploadFiles(files)
    if (fileInput.current) fileInput.current.value = ''
  }
  const post = (file: File) => {
    let _file: UploadFile = {
      uid: 'file-' + Date.now(),
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    }
    setFileList(prevList => {
      return [_file, ...prevList]
    })
    const formData = new FormData()
    formData.append(name || 'file', file)
    if (data) {
      Object.keys(data).forEach(key => {
        formData.append(key, data[key])
      })
    }
    axios.post(action, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        'Access-Control-Allow-Headers': 'Authorization,Origin, X-Requested-With, Content-Type, Accept',
        ...headers,
      },
      withCredentials,
      onUploadProgress: (e) => {
        const percentage = Math.round((e.loaded * 100) / e.total) || 0
        if (percentage < 100) {
          updateFileList(_file, { percent: percentage, status: 'uploading' })
          if (onProgress) onProgress(percentage, file)
        }
      }
    }).then(res => {
      console.log(res)
      updateFileList(_file, { status: 'success', response: res.data })
      if (onSuccess) onSuccess(res.data, file)
      if (onChange) onChange(file)
    }).catch(err => {
      console.log(err)
      updateFileList(_file, { status: 'error', error: err })
      if (onError) onError(err, file)
      if (onChange) onChange(file)
    })
  }
  const handleRemove = (file: UploadFile) => {
    setFileList(prevList => {
      return prevList.filter(item => item.uid !== file.uid)
    })
    if (onRemove) onRemove(file)
  }
  const uploadFiles = (files: FileList) => {
    const postFiles = Array.from(files)
    postFiles.forEach(file => {
      if (!beforeUpload) {
        post(file)
      } else {
        const result = beforeUpload(file)
        if (result && result instanceof Promise) {
          result.then(processedFile => post(processedFile))
        } else if (result !== false) {
          post(file)
        }
      }
    })
  }
  return (
    <div className="guo-upload-component">
      <Button
        btnType="primary"
        onClick={handleClick}
      >
        Upload File
      </Button>
      <input
        className="guo-file-input"
        type="file"
        style={{ display: 'none' }}
        ref={fileInput}
        onChange={handleFileChange}
        accept={accept}
        multiple={multiple}
      />
      <UploadList
        fileList={fileList}
        onRemove={handleRemove}
      />
    </div>
  )
};
Upload.defaultProps = {
  name: 'file',
}
export default Upload;
