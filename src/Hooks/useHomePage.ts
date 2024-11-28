import { useEffect, useMemo, useState } from 'react'
import { Project } from '../entities/project.entity'
import { Role } from '../entities/projectUser.entity'
import ProjectUserSelectors from '../state/selector/proejctUser.selector'
import ProjectSelectors from '../state/selector/project.selector'
import UserSelectors from '../state/selector/user.selector'
import { Store, useAppStore } from '../state/store'
import { useShallow } from 'zustand/shallow'

const selectors = (state: Store) => ({
  list: ProjectSelectors.list(state),
  listMine: ProjectSelectors.base.listMine(state),
  getRole: ProjectUserSelectors.getRole(state),
  meId: UserSelectors.base.meId(state)!,
})

const useHomePage = () => {
  const [formOpen, setFormOpen] = useState(false)
  const { list, listMine, getRole, meId } = useAppStore(useShallow(selectors))

  useEffect(() => {
    void listMine()
  }, [listMine])

  const projectsByRole = useMemo(() => {
    const result: { [key in Role]: Project[] } = {
      owner: [],
      team_leader: [],
      member: [],
    }

    for (const project of list) {
      const role = getRole(project.id, meId)
      if (!role) continue

      result[role].push(project)
    }

    return result
  }, [list, getRole, meId])

  return { projectsByRole, setFormOpen, formOpen }
}

export default useHomePage
