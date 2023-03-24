import React,{useEffect} from 'react'
import { useGlobalContext } from '../../context/AppContext'
import { StatsContainer,ChartsContainer,Loading } from '../../components'

const Stats = () => {
  const { showStats, isLoading ,monthlyApplications} = useGlobalContext();

  useEffect(() => {
    showStats();
    // eslint-disable-next-line
  }, []);
  
  if (isLoading) {
    return <Loading center/>
  }
  
  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer/>}
    </>
  )
}

export default Stats
