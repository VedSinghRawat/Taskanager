import { FC, memo, useEffect, useMemo, useRef, useState } from 'react'
import { useTaskStore } from '../../Store/task.store'
import { taskRemoveAction, taskSetTimerActions } from '../../Store/task.selector'
import { AiFillDelete, AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import TaskDonePopup from '../UI/Popups/TaskDonePopup'
import TaskTimer from './TaskTimer'

interface TaskCardProps {
  task: Task
  className?: string
}

const TaskCard: FC<TaskCardProps> = ({ task, className }) => {
  const [isDonePopupOpen, setIsDonePopupOpen] = useState(false)

  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const [inc, dec] = useTaskStore(taskSetTimerActions)
  const [increaseTimer, decreaseTimer] = useMemo(() => [() => inc(task.id, 60), () => dec(task.id, 60)], [])

  const taskRemove = useTaskStore(taskRemoveAction)

  useEffect(() => {
    textAreaRef.current?.focus()
  }, [textAreaRef])

  const descriptionLines = task.description.split('\n')

  const formattedDescription = descriptionLines.map((line, i) => (
    <span key={i}>
      {line} {i < descriptionLines.length - 1 && <br />}
    </span>
  ))

  return (
    <div
      className={`${className} relative rounded-xl bg-primary-800 group focus-within:bg-secondary-600 p-2.5 transition-all duration-100 ease-in-out text-tertiary-600  focus-within:text-tertiary-800`}
    >
      <div className={`absolute -top-2 -right-1 flex gap-x-2`}>
        <AiFillDelete
          className={` bg-secondary-300 p-[1px] rounded-full h-5 w-5 cursor-pointer`}
          onClick={() => {
            taskRemove(task.id)
          }}
        />

        {task.timeLeft === 0 && (
          <BsFillCheckCircleFill
            className={` bg-secondary-300 p-[1px] rounded-full h-5 w-5  cursor-pointer`}
            onClick={() => setIsDonePopupOpen(true)}
          />
        )}
      </div>

      <p className={`bg-transparent group-focus-within:outline-primary-800 text-sm sm:text-base max-h-28 overflow-auto`}>{formattedDescription}</p>

      <div className={`flex items-center`}>
        <TaskTimer isDonePopupOpen={isDonePopupOpen} setIsDonePopupOpen={setIsDonePopupOpen} task={task} />

        {task.timeLeft < task.estimatedTime && (
          <div className={`flex flex-col ml-2 gap-y-1 `}>
            <button className={`rounded-full bg-secondary-300`}>
              <AiFillPlusCircle className={`text-tertiary-400 h-3.5 w-3.5`} onClick={increaseTimer} />
            </button>

            <button className={`rounded-full bg-secondary-300`}>
              <AiFillMinusCircle className={`text-tertiary-400 h-3.5 w-3.5`} onClick={decreaseTimer} />
            </button>
          </div>
        )}
      </div>

      <TaskDonePopup task={task} isOpen={isDonePopupOpen} setIsOpen={setIsDonePopupOpen} />
    </div>
  )
}

export default memo(TaskCard)
