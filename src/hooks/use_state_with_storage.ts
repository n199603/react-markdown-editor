import { useState } from 'react'

// カスタムフックの関数を定義
// init→初期値(useStateの引数と同じ)
// key→localStorageに保存する際のキー
// [string, (s:string) => void]→カスタムフックの戻り値(useStateの戻り値と同じ)
export const useStateWithStorage = (init: string, key: string): [string, (s:string) => void] => {
  // useStateの呼び出し
  // localStorageの値を取得する(取得できない場合は引数の初期値を使用する)
  const [value, setValue] = useState<string>(localStorage.getItem(key) || init)

  // localStorageへの保存
  const setValueWithStorage = (nextValue: string): void => {
    setValue(nextValue)
    localStorage.setItem(key, nextValue)
  }

  // useStateから取得した値とlocalStorageへの保存
  return [value, setValueWithStorage]
}