import { createSelector } from 'reselect'
import { createSliceSelectors, taskSliceSelector } from '../selector'
import { Store } from '../store'

export default class TaskSelectors {
  public static base = createSliceSelectors(
    'task',
    {
      map: undefined,
      loading: undefined,
      idsToConfirm: undefined,
      addToConfirm: undefined,
      clearConfirm: undefined,
      delete: undefined,
      removeFromConfirm: undefined,
      update: undefined,
      create: undefined,
      subscribe: undefined,
      taskIdsByProjectId: undefined,
      move: undefined,
      listByProjectId: undefined,
    },
    taskSliceSelector
  )

  static listByProjectId = createSelector(
    this.base.map,
    this.base.taskIdsByProjectId,
    (_: Store, projectId: number) => projectId,
    (map, taskIdsByProjectId, projectId) => {
      return projectId ? taskIdsByProjectId[projectId]?.map((id) => map[id]!) || [] : []
    }
  )

  static remainingTimeByProject = createSelector(this.listByProjectId, (tasks) => {
    return tasks.reduce((curr, task) => curr + task.estimated_time, 0)
  })

  static toConfirmList = createSelector([this.base.idsToConfirm, this.base.map], (ids, map) => ids.map((id) => map[id]!))
}
