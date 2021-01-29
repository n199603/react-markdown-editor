import * as React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from '../components/button.tsx'

export const History: React.FC = () => {
  const history = useHistory()
  return (
    <>
      <h1>History</h1>
      {/* history.push('遷移したいパス') */}
      <Button onClick = {() => history.push('/editor')}>
        Editor
      </Button>
    </>
  )
}