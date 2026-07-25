# Medical Forest 🌿

**あなたの未来を育てる、医療職適性診断** ― 7つの質問に答えるだけで、15の医療職の中から
最も向いている職種をAIが分析するWebアプリです。

- 森をテーマにしたアニメーション背景（木漏れ日・葉の舞い）
- 7問のカード式診断（15職種に対応したスコアリング）
- 適性6項目のレーダーチャート
- 「この職業になった理由」を自然な文章で語るAI診断コメント
- 相性の良い医療職種とその理由
- 進学アドバイス・SNSシェアなど

## セットアップ

```bash
npm install
npm run dev
```

`http://localhost:5173` で確認できます。

## ビルド

```bash
npm run build
npm run preview
```

`dist/` に静的ファイルが出力されます。

## GitHub Pages へのデプロイ（自動・推奨）

このリポジトリには `.github/workflows/deploy.yml` が含まれており、`main` ブランチに
push するたびに自動でビルドされ、GitHub Pages に公開されます。

1. GitHubでリポジトリを作成し、このプロジェクトをpush:
   ```bash
   git init
   git add .
   git commit -m "Medical Forest 初回コミット"
   git branch -M main
   git remote add origin https://github.com/<ユーザー名>/<リポジトリ名>.git
   git push -u origin main
   ```
2. リポジトリの `Settings > Pages` を開き、「Build and deployment」の **Source** を
   **GitHub Actions** に設定する（これは最初の1回だけでOK）。
3. `Actions` タブでワークフローの実行状況を確認する（数十秒〜数分で完了）。
4. 完了後、`https://<ユーザー名>.github.io/<リポジトリ名>/` で公開される。

以降は `main` ブランチにpushするだけで自動的に再デプロイされます。

## 手動デプロイしたい場合（代替手段）

`gh-pages` パッケージを使ったコマンド一発のデプロイも用意しています:
```bash
npm install
npm run deploy
```
この場合は `Settings > Pages` の Source を **Deploy from a branch** にし、
Branch を `gh-pages` / フォルダを `/(root)` に設定してください。
（GitHub Actions方式と手動方式はどちらか一方で構いません。）

## AIによるパーソナライズコメントについて（重要）

`src/App.jsx` の `callClaudeForResult` 関数は、Anthropic API
(`https://api.anthropic.com/v1/messages`) に直接 `fetch` するコードになっています。
これは Claude.ai のアーティファクト環境内では自動的にプロキシされて動作しますが、
**このリポジトリをそのまま GitHub Pages 等でホストした場合、ブラウザから直接
Anthropic API を呼び出すことはできません**（CORSでブロックされる／APIキーが必要なため）。

そのため、このプロジェクトをそのまま公開すると `callClaudeForResult` は失敗し、
自動的に `fallbackAI()`（ローカルで生成する診断文）にフォールバックします。
診断アプリとしての機能（質問・スコアリング・レーダーチャート・結果表示）は
フォールバックのみでも問題なく完動します。

本物のAI生成コメントを使いたい場合は、以下のいずれかの対応が必要です:

1. **バックエンド（サーバーレス関数など）を用意し**、そこでAnthropic APIキーを保持して
   フロントエンドからはそのバックエンドを呼び出す形にする
   （例: Vercel/Netlify Functions、Cloudflare Workers など）。
2. `callClaudeForResult` の呼び出し先URLを、上記のような自前のプロキシAPIのURLに書き換える。

APIキーをフロントエンドのコードや `.env` に直接書いて公開リポジトリに含めないよう
ご注意ください。

## 主なディレクトリ構成

```
medical-forest-app/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx      # エントリーポイント
│   ├── App.jsx        # アプリ本体（診断ロジック・全画面・AI連携）
│   └── index.css      # 最小限のグローバルスタイル
└── README.md
```

## 今後の拡張候補（仕様書より）

- 管理者機能（質問・回答編集、職種追加/削除、利用データ分析）
- 全国の大学・専門学校検索、オープンキャンパス情報
- AIチャット相談、保護者向け解説モード
- PWA対応
