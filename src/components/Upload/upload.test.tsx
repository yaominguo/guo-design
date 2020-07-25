import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import axios from 'axios'
import { render, RenderResult, fireEvent, wait, createEvent } from '@testing-library/react'
import { Upload, UploadProps } from './upload'

jest.mock('../Icon/icon.tsx', () => {
  return ({ icon, onClick }) => {
    return <span onClick={onClick}>{icon}</span>
  }
})
jest.mock('axios')
const mockAxios = axios as jest.Mocked<typeof axios>

const testProps: UploadProps = {
  action: 'test-url.com',
  onSuccess: jest.fn(),
  onChange: jest.fn(),
  onRemove: jest.fn(),
  drag: true,
}

let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement
const testFile = new File(['file'], 'test.png', { type: 'image/png' })
describe('test upload component', () => {
  beforeEach(() => {
    wrapper = render(<Upload {...testProps}>Click to upload</Upload>)
    fileInput = wrapper.container.querySelector('.guo-file-input') as HTMLInputElement
    uploadArea = wrapper.queryByText('Click to upload') as HTMLElement
  })
  it('upload process should works fine', async () => {
    const { queryByText } = wrapper
    mockAxios.post.mockResolvedValue({ 'data': 'done!' })
    expect(uploadArea).toBeInTheDocument()
    expect(fileInput).not.toBeVisible()
    fireEvent.change(fileInput, { target: { files: [testFile] } })
    // expect(queryByText('spinner') as HTMLElement).toBeInTheDocument()
    await wait(() => {
      expect(queryByText('test.png') as HTMLElement).toBeInTheDocument()
    })
    expect(queryByText('check-circle') as HTMLElement).toBeInTheDocument()
    expect(testProps.onSuccess).toHaveBeenCalledWith('done!', testFile)
    expect(testProps.onChange).toHaveBeenCalledWith(testFile)

    // remove the uploaded file
    expect(queryByText('times')).toBeInTheDocument()
    fireEvent.click(queryByText('times') as HTMLElement)
    expect(queryByText('test.png')).not.toBeInTheDocument()
    expect(testProps.onRemove).toHaveBeenCalledWith(expect.objectContaining({
      raw: testFile,
      status: 'success',
      name: 'test.png',
    }))
  })
  it('drag and drop files should works fine', async () => {
    fireEvent.dragOver(uploadArea)
    expect(uploadArea).toHaveClass('is-dragover')
    fireEvent.dragLeave(uploadArea)
    expect(uploadArea).not.toHaveClass('is-dragover')
    // fireEvent.drop(uploadArea, { dataTransfer: { files: [testFile] } })
    const mockDropEvent = createEvent.drop(uploadArea)
    Object.defineProperty(mockDropEvent, 'dataTransfer', {
      value: {
        files: [testFile]
      }
    })
    fireEvent(uploadArea, mockDropEvent)
    await wait(() => {
      expect(wrapper.queryByText('test.png')).toBeInTheDocument()
    })
    expect(testProps.onSuccess).toHaveBeenCalledWith('done!', testFile)
    expect(testProps.onChange).toHaveBeenCalledWith(testFile)
  })
})