import * as React from 'react'
import styled from 'styled-components'
import { useStateWithStorage } from '../hooks/use_state_with_storage'
import * as ReactMarkdown from 'react-markdown'
import { putMemo } from '../indexeddb/memos'
import { Button } from '../components/button.tsx';
import { SaveModal } from '../components/save_modal.tsx'
import { Link } from 'react-router-dom';
import { Header } from '../components/header.tsx'

// useStateをReactから取り出す
const { useState } = React

// localStorage でデータの参照・保存に使用するキー名
const StorageKey = 'pages/editor:text'

// スタイル
// const Header = styled.header`
//   align-content: center;
//   display: flex;
//   font-size: 1.5rem;
//   height: 2rem;
//   justify-content: space-between;
//   left: 0;
//   line-height: 2rem;
//   padding: 0.5rem 1rem;
//   position: fixed;
//   right: 0;
//   top: 0;
// `

// const HeaderControl = styled.div`
//   height: 2rem;
//   display: flex;
//   align-content: center;
// `

const Wrapper = styled.div`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 3rem;
`

const HeaderArea = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  left: 0;
`

const TextArea = styled.textarea`
  border-right: 1px solid silver;
  border-top: 1px solid silver;
  bottom: 0;
  font-size: 1rem;
  left: 0;
  padding: 0.5rem;
  position: absolute;
  top: 0;
  width: 50vw;
`

const Preview = styled.div`
  border-top: 1px solid silver;
  bottom: 0;
  overflow-y: scroll;
  padding: 1rem;
  position: absolute;
  right: 0;
  top: 0;
  width: 50vw;
`

// Editorという変数をReact.FC(関数コンポーネント)という型であると定義する
// <Editor>が使用可能になる
export const Editor: React.FC = () => {
  // 状態を管理する
  // const [値, 値をセットする関数] = useState<扱う状態の型(ジェネリクス)>(初期値)
  // useStateの初期値にlocalStorageから取得した値をセット(初回はnullを返す)
  // const [text, setText] = useState<string>(localStorage.getItem(StorageKey) || '')

  // カスタムフックに書き換え
  const [text, setText] = useStateWithStorage('', StorageKey)

  // 初期状態ではモーデルを表示しない
  const [showModal, setShowModal] = useState(false)
  
  return (
    // <React.Fragment>を省略
    // Reactは1つの要素を返却する必要がある
    // divでも良いが無駄なタグのため意味のないReact.Fragmentを使用する
    <>
      <HeaderArea>
        <Header title = "Markdown Editor">
          <Button onClick={() => setShowModal(true)}>
            Save
          </Button>
          <Link to = "/history">
            History
          </Link>
        </Header>
      </HeaderArea>
      <Wrapper>
        <TextArea
          // // テキストの内容が変更された時に実行される関数を渡す
          // // eventを引数として渡す
          // onChange = {(event) => {
          //   // event.target.valueにテキストの内容を格納
          //   const changedText = event.target.value
          //   // 変更内容をlocalStorageへ保存
          //   localStorage.setItem(StorageKey, changedText)
          //   setText(changedText)
          // }}

          // カスタムフックに書き換えにより変更
          onChange = {(event) => setText(event.target.value)}
          // テキストの内容を渡す(useStateで管理している変数のtext)
          value = {text}
        />
        <Preview>
          <ReactMarkdown source={text} />
        </Preview>
      </Wrapper>
      {showModal && (
        <SaveModal
          onSave = {(title: string): void => {
            putMemo(title, text)
            setShowModal(false)
          }}
          onCancel = {() => setShowModal(false)}
        />
      )}
    </>
  )
}