import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import Alert, { AlertProps } from './alert'

const defaultProps: AlertProps = {
  message: 'Test Alert',
}
const createStyleFile = () => {
  const cssFile: string = `
    .guo-alert {
      display: block;
    }
    .guo-alert.none {
      display: none;
    }
  `
  const style = document.createElement('style')
  style.type = 'text/css'
  style.innerHTML = cssFile
  return style
}


describe('Test Alert Component', () => {
  it('should render the correct default alert', () => {
    const wrapper = render(<Alert {...defaultProps} />)
    const element = wrapper.getByTestId('test-alert')
    expect(element).toBeInTheDocument()
    expect(element).toBeVisible()
    expect(element).toHaveClass('guo-alert guo-alert-primary')
    expect(element.querySelectorAll('.close-btn').length).toEqual(0)
    expect(element.querySelectorAll('h5').length).toEqual(0)
    expect(element.querySelectorAll('p').length).toEqual(0)
  })
  it('should render the correct success alert with description', () => {
    const wrapper = render(<Alert type="success" description="'This is a description'" {...defaultProps} />)
    const element = wrapper.getByTestId('test-alert')
    expect(element).toBeInTheDocument()
    expect(element).toBeVisible()
    expect(element).toHaveClass('guo-alert guo-alert-success')
    expect(element.querySelectorAll('.close-btn').length).toEqual(0)
    expect(element.querySelectorAll('h5').length).toEqual(1)
    expect(element.querySelectorAll('p').length).toEqual(1)
  })
  it('should render the correct closable info alert', async () => {
    const wrapper = render(<Alert type="info" closable {...defaultProps} />)
    wrapper.container.append(createStyleFile())
    const element = wrapper.getByTestId('test-alert')
    expect(element).toBeInTheDocument()
    expect(element.querySelectorAll('.close-btn').length).toEqual(1)
    fireEvent.click(element.querySelector('.close-btn') as Node)
    expect(element).toHaveClass('guo-alert guo-alert-info none')
    await wait(() => {
      expect(element).not.toBeVisible()
    })
  })
})
