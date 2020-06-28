import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button, { ButtonProps, ButtonSize, ButtonType } from './button'

const defaultProps = {
  onClick: jest.fn()
}
const testProps: ButtonProps = {
  btnType: ButtonType.Primary,
  size: ButtonSize.Small,
  className: 'test'
}
const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn()
}

describe('test Button component', () => {
  it('should render the correct default button', () => {
    const wrapper = render(<Button {...defaultProps}>Button</Button>)
    const element = wrapper.getByText('Button') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element.disabled).toBeFalsy()
    expect(element).toHaveClass('btn btn-default')
    fireEvent.click(element)
    expect(defaultProps.onClick).toHaveBeenCalled()
  })
  it('should render the correct button base on different props', () => {
    const wrapper = render(<Button {...testProps}>Button</Button>)
    const element = wrapper.getByText('Button')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('btn btn-primary btn-sm test')
  })
  it('should render a link when btnType equals link && href is provided', () => {
    const wrapper = render(<Button btnType={ButtonType.Link} href="http://www.baidu.com">Link</Button>)
    const element = wrapper.getByText('Link')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('A')
    expect(element).toHaveClass('btn btn-link')
  })
  it('should render disabled button when disabled is true', () => {
    const wrapper = render(<Button {...disabledProps}>Button</Button>)
    const element = wrapper.getByText('Button') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.disabled).toBeTruthy()
    fireEvent.click(element)
    expect(disabledProps.onClick).not.toHaveBeenCalled()
  })
})