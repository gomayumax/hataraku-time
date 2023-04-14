# hataraku-time
Googleカレンダーに登録された勤務時間を集計してくれる君
GASで動く

## 使い方

1. スプレッドシートを作成
2. 任意のセルに集計したい年と月を記載
3. スクリプトを作成
4. コードをコピペ
5. セル番号をコードに記載 / targetLabelに集計したいカレンダーのタイトルを書く

```js
var year = "B1"
var month = "B2"
var render = "B4"
var targetLabel = "勤務"
```

5. myFunctionを実行
6. あとは、休憩時間とかを差し引きしたりして、よしなに整えて
<img width="776" alt="スクリーンショット 2023-04-05 20 14 35" src="https://user-images.githubusercontent.com/5946103/231924870-47ee4ce6-070b-46b9-b16d-9d4a135f4ce2.png">
