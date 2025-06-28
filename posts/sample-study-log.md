---
title: 'Next.jsとReactの学習記録'
date: '2023-10-26'
---

## Next.jsの基本

Next.jsはReactのフレームワークで、サーバーサイドレンダリング(SSR)や静的サイト生成(SSG)を簡単に実現できます。これにより、SEOに強く、パフォーマンスの高いウェブサイトを構築できます。

### 主な機能

*   **ファイルベースルーティング**: `pages` ディレクトリ内のファイル構造がそのままルーティングになります。
*   **API Routes**: バックエンドのAPIをNext.jsアプリケーション内で作成できます。
*   **Image Optimization**: 画像の最適化を自動で行い、表示速度を向上させます。

```javascript
// pages/index.js
import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>My App</title>
      </Head>
      <h1>Welcome to Next.js!</h1>
    </div>
  )
}
```

## React Hooksについて

React Hooksは、関数コンポーネントでstateやライフサイクルメソッドのようなReactの機能を「フック」するためのものです。これにより、クラスコンポーネントを書かずにReactの機能を活用できます。

### よく使うHooks

*   `useState`: 関数コンポーネントにstateを追加します。
*   `useEffect`: 副作用（データ取得、DOM操作など）を処理します。
*   `useContext`: Context APIを使ってコンポーネントツリー全体でデータを共有します。

```javascript
import React, { useState, useEffect } from 'react'

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default Counter;
```

これらの技術を学ぶことで、より効率的でモダンなウェブ開発ができるようになりました。