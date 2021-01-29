import Dexie from 'dexie'

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