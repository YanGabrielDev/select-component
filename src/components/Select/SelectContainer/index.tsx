import { ComponentProps, useEffect, useState } from 'react'
import './styles.css'
import { ArrowIcon } from '../../../../public/icons'
import { Options } from '..'
import { Option } from '../../../interfaces/option.interface'
import { removeAccent } from '../../../utils/removeAccent'

interface SelectProps extends ComponentProps<'input'> {
  options?: Array<Option>
}
export const Select = ({ options, ...props }: SelectProps) => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [selectOptions, setSelectOptions] = useState<Array<Option>>()
  const [showOptions, setShowOptions] = useState<boolean>(false)
  const [hoverInOptions, setHoverInOptions] = useState<boolean>(false)

  const filterOptions = (option: string) => {
    const filteredOptions = options?.filter(({ label }) => {
      const labelFormated = removeAccent(label)
      const optionFormated = removeAccent(option)
      return labelFormated.includes(optionFormated)
    })

    return filteredOptions
  }
  const handleHoverOptions = (hover: boolean) => setHoverInOptions(hover)

  const handleChangeSearch = (search: string) => {
    setSearchValue(search)

    if (search.length > 0) {
      setSelectOptions(filterOptions(search))
    }
  }

  const handleFocus = () => {
    setShowOptions(true)
  }

  const handleBlur = () => {
    const options = filterOptions(searchValue)
    const isInvalidOption = options?.length === 0
    if (isInvalidOption) {
      setSearchValue('')
    }

    if (!hoverInOptions) {
      setShowOptions(false)
    }
  }

  const handleClickOption = (value: string) => {
    setSearchValue(value)
    setShowOptions(false)
  }

  useEffect(() => {
    setSelectOptions(options)
  }, [options, showOptions])

  return (
    <div
      className="select-container"
      onMouseEnter={() => handleHoverOptions(true)}
      onMouseLeave={() => handleHoverOptions(false)}
    >
      <div className={`custom-select ${showOptions && 'custom-select-active'}`}>
        <input
          {...props}
          className="search-input"
          type="text"
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={searchValue}
          onChange={(e) => handleChangeSearch(e.target.value)}
        />
        {ArrowIcon}
      </div>
      {showOptions && (
        <Options
          options={selectOptions}
          handleClickOption={handleClickOption}
        />
      )}
    </div>
  )
}
