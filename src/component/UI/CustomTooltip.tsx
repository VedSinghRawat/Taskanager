import { FC, ReactNode } from 'react'
import { TooltipProps } from 'recharts'
import { NameType, Payload, ValueType } from 'recharts/types/component/DefaultTooltipContent'

export const CustomTooltip: FC<
  TooltipProps<ValueType, NameType> & {
    mainNode: (dataPoint: any) => ReactNode
    tickNode?: (tickVal: Payload<ValueType, NameType>) => ReactNode
  }
> = ({ active, payload: ticks, mainNode, tickNode }) => {
  if (active && ticks && ticks[0]) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const dataPoint = ticks[0].payload

    return (
      <div className="max-w-[15rem] bg-primary-8 bg-opacity-80 p-2 text-secondary-3 rounded-xs">
        {tickNode && (
          <div className={`grid grid-cols-2 gap-x-2`}>
            {ticks.map((tick) => {
              if (tick.dataKey && tick.value) {
                return (
                  <p key={tick.color} style={{ color: tick.color }}>
                    {tickNode(tick)}
                  </p>
                )
              }

              return <></>
            })}
          </div>
        )}

        <p className="text-sm">{mainNode(dataPoint)}</p>
      </div>
    )
  }

  return null
}
