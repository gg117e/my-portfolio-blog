import Head from 'next/head'

export default function About() {
  return (
    <>
      <Head>
        <title>About Me</title>
      </Head>
      <div className="py-5">
        <h1 className="display-4 fw-bold mb-3 text-center">About Me</h1>
        <p className="lead text-center">こんにちは！私は現在、大学4年生で、情報科学を専攻しています。来年からは大学院に進学し、〇〇（研究テーマのキーワード）に関する研究を深める予定です。</p>
        <p className="text-center">このブログでは、日々の学習や研究の記録、そして個人開発プロジェクトの進捗などを発信しています。特に、Web開発とデータサイエンスの分野に強い関心があり、新しい技術を学ぶこと、そしてそれらを活用して社会に役立つアプリケーションを構築することに情熱を注いでいます。</p>

        <div className="row mt-5">
          <div className="col-md-8 mx-auto">
            <h3 className="mb-3">私のスキルと経験</h3>
            <p>これまでに、主に以下の技術を用いた開発経験があります。</p>
            <ul>
              <li><strong>JavaScript (React, Next.js)</strong>: このポートフォリオサイトもNext.jsで構築しており、モダンなWebアプリケーション開発に強みがあります。</li>
              <li><strong>Python (Django, Flask, データ分析ライブラリ)</strong>: バックエンド開発やデータ分析、機械学習の分野でPythonを活用してきました。研究でもPythonを使用しています。</li>
              <li><strong>Node.js (Express)</strong>: RESTful APIの構築経験があります。</li>
              <li><strong>Databases (PostgreSQL, MongoDB)</strong>: リレーショナルデータベースとNoSQLデータベースの両方の設計・運用経験があります。</li>
              <li><strong>Cloud Platforms (AWS, GCP)</strong>: クラウド環境でのデプロイやサービス利用の基礎知識があります。</li>
            </ul>
            <p>現在、〇〇（学習中の技術や興味のある分野）についても積極的に学習を進めています。</p>

            <h3 className="mb-3 mt-5">研究と将来の展望</h3>
            <p>大学院では、〇〇（具体的な研究テーマや興味のある分野）に関する研究に注力する予定です。特に、〇〇（具体的な技術や課題）を解決するためのアプローチに興味があります。</p>
            <p>来年の夏のインターンシップから本格的に就職活動を開始する予定です。これまでの学習と研究で培った知識と経験を活かし、社会に貢献できるソフトウェアエンジニアを目指しています。特に、〇〇（興味のある業界や企業タイプ）のような環境で、チームの一員として成長していきたいと考えています。</p>

            <h3 className="mb-3 mt-5">趣味と関心</h3>
            <p>プログラミング以外では、〇〇（趣味や興味）を楽しんでいます。新しい技術や知識を学ぶことと同様に、これらの活動も私の創造性や問題解決能力を養う上で役立っています。</p>
          </div>
        </div>
      </div>
    </>
  )
}