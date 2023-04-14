# hataraku-time
Googleカレンダーに登録された勤務時間を集計してくれる君
GASで動く

## 使い方

1. スプレッドシートを作成
1. 任意のセルに集計したい年と月を記載
1. コード上のセル番号をコードに記載 / targetLabelに集計したいカレンダーのタイトルを書く

```js
var year = "B1"
var month = "B2"
var render = "B4"
var targetLabel = "勤務"
```

1. myFunctionを実行
