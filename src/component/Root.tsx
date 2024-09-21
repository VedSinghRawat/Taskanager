import { FC, memo, useEffect } from 'react'
import { Outlet } from 'react-router'
import { Store, useAppStore } from '../state/store'
import UserSelectors from '../state/selector/user.selector'
import { loadingSelector } from '../state/selector'
import { Loading } from './UI/Loading'

interface RootProps {}

const selectors = (state: Store) => ({
  fetchMe: UserSelectors.base.fetchMe(state),
  meId: UserSelectors.base.meId(state),
  loading: loadingSelector(state),
})

const Root: FC<RootProps> = () => {
  const { fetchMe, loading, meId } = useAppStore(selectors)

  useEffect(() => {
    meId === undefined && void fetchMe()
  }, [fetchMe, meId])

  console.log({ loading })
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <Loading />
      </div>
    )

  return (
    <div className={`min-w-full min-h-screen bg-black text-primary-12`}>
      <Outlet />
    </div>
  )
}

export default memo(Root)
