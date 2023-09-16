import { format } from 'date-fns'
import { FC, memo } from 'react'
import { secondsToHHMMSS } from '../../../utils'

interface TimeSpentProps {
  totalEstimatedTime: number
  totalTimeWorked: number
  overTimeWorked: number
  underEstimate: number
  historyDate: Date
  className?: string
}

const TimeSpent: FC<TimeSpentProps> = ({ overTimeWorked, className, historyDate, totalEstimatedTime, totalTimeWorked, underEstimate }) => {
  return (
    <section className={className}>
      <h2 className={`text-xl mb-2`}>Time Spent</h2>

      <p>
        Your estimate for the day was: <span className={`font-semibold text-lg`}>{secondsToHHMMSS(totalEstimatedTime)}</span>
      </p>

      <p>
        Total time worked on {format(historyDate, 'io LLLL')}: <span className={`font-semibold text-lg`}>{secondsToHHMMSS(totalTimeWorked)}</span>
      </p>

      <p>
        Time spent over your estimate: <span className={`text-red-500 font-semibold text-lg`}>{secondsToHHMMSS(overTimeWorked)}</span>
      </p>

      <p>
        Time saved under your estimate: <span className={`font-semibold  text-[#48e629] text-lg`}>{secondsToHHMMSS(underEstimate)}</span>
      </p>
    </section>
  )
}

export default memo(TimeSpent)
