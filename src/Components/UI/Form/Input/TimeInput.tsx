import { FC, memo, useEffect, useRef, useState } from 'react'
import Input, { InputProps } from './Input'
import { TimeString } from '../../../../utils'

interface TimeInputProps extends InputProps {
  containerClasses?: string
  getValue?: (timeString: TimeString) => void
  className?: string
}

const TimeInput: FC<TimeInputProps> = ({ className, containerClasses, getValue, ...rest }) => {
  const hourInputRef = useRef<HTMLInputElement>(null)
  const minuteInputRef = useRef<HTMLInputElement>(null)
  const secondInputRef = useRef<HTMLInputElement>(null)

  const [hourValue, setHourValue] = useState('')
  const [minuteValue, setMinuteValue] = useState('')
  const [secondValue, setSecondValue] = useState('')

  const inputsData = [
    { ref: hourInputRef, label: 'h', className: `!rounded-l-md !rounded-none pr-4 w-12 ${className}`, value: hourValue, setter: setHourValue },
    { ref: minuteInputRef, label: 'm', className: `!rounded-none pr-5 w-11 ${className}`, value: minuteValue, setter: setMinuteValue },
    { ref: secondInputRef, label: 's', className: `!rounded-r-md !rounded-none pr-3.5 w-9 ${className}`, value: secondValue, setter: setSecondValue },
  ]

  const inputVals = [hourValue, minuteValue, secondValue]

  useEffect(() => {
    getValue && getValue(inputVals.join(':') as TimeString)
  }, inputVals)

  return (
    <div className={`text-lg ${containerClasses}`}>
      {inputsData.map(({ ref, label, className, setter, value }, i) => {
        return (
          <span className={`relative`} key={label}>
            <Input
              placeholder="00"
              value={value}
              onChange={(e) => {
                const val = e.currentTarget.value
                !isNaN(+val) && setter(val)

                if (val.length >= 2) inputsData[i - 1]?.ref.current?.focus()
              }}
              setRef={ref}
              className={`text-right !outline-none !border-0 ${className}`}
              {...rest}
            />

            <span className={`right-1 top-1/2 -translate-y-1/2 absolute text-opacity-70`}>{label}</span>
          </span>
        )
      })}
    </div>
  )
}

export default memo(TimeInput)
