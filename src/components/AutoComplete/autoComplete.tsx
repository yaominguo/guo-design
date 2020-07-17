import React, { FC, useState, useEffect, useRef, KeyboardEvent, ChangeEvent, ReactElement } from 'react'
import classNames from "classnames";
import Input, { InputProps } from '../Input/input'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'
import Icon from '../Icon/icon'
interface DataSourceObject {
  value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
  onSelect?: (item: DataSourceType) => void;
  renderOption?: (item: DataSourceType) => ReactElement;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestions, onSelect, renderOption, value, ...restProps } = props
  const [inputValue, setInputValue] = useState(value as string)
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
  const [loading, setLoading] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(-1)
  const triggerSearch = useRef(false)
  const componentRef = useRef<HTMLDivElement>(null)
  const debounceValue = useDebounce(inputValue, 500)
  useClickOutside(componentRef, () => setSuggestions([]))
  useEffect(() => {
    if (debounceValue && triggerSearch.current) {
      const results = fetchSuggestions(debounceValue)
      if (results instanceof Promise) {
        setLoading(true)
        results.then(data => {
          setLoading(false)
          setSuggestions(data)
        })
      } else {
        setSuggestions(results)
      }
    } else {
      setSuggestions([])
    }
    setHighlightIndex(-1)
  }, [debounceValue])
  const highlight = (index: number) => {
    if (index < 0) index = 0
    if (index >= suggestions.length) index = suggestions.length - 1
    setHighlightIndex(index)
  }
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case 13: // Enter
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex])
        }
        break;
      case 38: // 上
        highlight(highlightIndex - 1)
        break;
      case 40: // 下
        highlight(highlightIndex + 1)
        break;
      case 27: // Esc
        setSuggestions([])
        break;
      default:
        break;
    }
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    triggerSearch.current = true
  }
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    setSuggestions([])
    if (onSelect) onSelect(item)
    triggerSearch.current = false
  }
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }
  const generateDropdown = () => {
    return (
      <ul>
        {suggestions.map((item, index) => {
          const classes = classNames('suggestion-item', {
            'item-highlighted': index === highlightIndex
          })
          return (
            <li className={classes} key={index} onClick={() => handleSelect(item)}>
              {renderTemplate(item)}
            </li>
          )
        })}
      </ul>
    )
  }
  return (
    <div className="guo-auto-complete" ref={componentRef}>
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      {loading && <Icon icon="spinner" spin />}
      {(suggestions.length > 0) && generateDropdown()}
    </div>
  )
};

export default AutoComplete;

