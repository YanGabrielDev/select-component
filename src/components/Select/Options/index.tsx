import { ComponentProps } from 'react'
import './styles.css'
interface OptionsProps extends ComponentProps<'div'> {
  options?: Array<{ label: string; value: string }>
  handleClickOption: (value: string) => void
}
export const Options = ({
  options,
  handleClickOption,
  ...props
}: OptionsProps) => {
  return (
    <div {...props} className="options-container">
      <ul>
        {options?.map(({ label, value }) => (
          <li key={label} onClick={() => handleClickOption(value)}>
            {label}
          </li>
        ))}
      </ul>
    </div>
  )
}
