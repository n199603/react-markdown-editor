import * as React from 'react'
// import { useHistory } from 'react-router-dom'
// import { Button } from '../components/button.tsx'
import {
  Link,
  useHistory,
} from 'react-router-dom'
import styled from 'styled-components'
import { Header } from '../components/header.tsx'

const HeaderArea = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  left: 0;
`

const Wrapper = styled.div`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 3rem;
  padding: 0 1rem;
`

// export const History: React.FC = () => {
//   const history = useHistory()
//   return (
//     <>
//       <h1>History</h1>
//       {/* history.push('遷移したいパス') */}
//       <Button onClick = {() => history.push('/editor')}>
//         Editor
//       </Button>
//     </>
//   )
// }

export const History: React.FC = () => {
  return (
    <>
      <HeaderArea>
        <Header title = "History">
          <Link to = "/editor">
            Back
          </Link>
        </Header>
      </HeaderArea>
      <Wrapper>
        TODO: 履歴表示
      </Wrapper>
    </>
  )
}