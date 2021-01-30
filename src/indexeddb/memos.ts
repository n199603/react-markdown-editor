import Dexie from 'dexie'
import { memo } from 'react'

// 保存するデータの型を定義
export interface MemoRecord {
  datetime: string
  title: string
  text: string
}

// Dexieインスタンス生成
// markdown-editorはデータベース名
const database = new Dexie('markdown-editor')

// テーブルを定義
database.version(1).stores({ memos: '&datetime' })

// テーブルクラスを取得
const memos: Dexie.Table<MemoRecord, string> = database.table('memos')

// メモを保存
// タイトルとテキストを引数として受け取る関数
export const putMemo = async (title: string, text: string): Promise<void> => {
  const datetime = new Date().toISOString()
  await memos.put({ datetime, title, text})
}

// 戻り値は配列
export const getMemos = (): Promise<MemoRecord[]> => {
  // 保存した日時の照準で取得
  return memos.orderBy('datetime')
    // 降順に並び替え
    .reverse()
    // 配列に変換
    .toArray()
}