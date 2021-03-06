import * as React from 'react'
// import { useHistory } from 'react-router-dom'
// import { Button } from '../components/button.tsx'
import {
  Link,
  useHistory,
} from 'react-router-dom'
import styled from 'styled-components'
import { Header } from '../components/header.tsx'
import {
  getMemos,
  MemoRecord,
} from '../indexeddb/memos'

const { useState, useEffect} = React

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
const Memo = styled.button`
    display: block;
    background-color: white;
    border: 1px solid gray;
    width: 100%;
    padding: 1rem;
    margin: 1rem 0;
    text-align: left;
  `
  
  const MemoTitle = styled.div`
    font-size: 1rem;
    margin-bottom: 0.5rem;
  `
  
  const MemoText = styled.div`
    font-size: 0.85rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
  const [memos, setMemos] = useState<MemoRecord[]>([])
  // console.log(memos)

  // レンダリング後実行(実行したい関数, 変更を監視する状態の配列)
  useEffect(() => {
    getMemos().then(setMemos)
  }, [])

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
        {/* map→配列の要素を関数に渡し、戻り値から再度配列にする */}
        {memos.map(memo => (
          <Memo key={memo.datetime}>
            <MemoTitle>{memo.title}</MemoTitle>
            <MemoText>{memo.text}</MemoText>
          </Memo>
        ))}
      </Wrapper>
    </>
  )
}