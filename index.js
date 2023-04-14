var year = "B1"
var month = "B2"
var render = "B4"
var targetLabel = "勤務"

// 月の開始時刻と終了時刻を取得
function getCurrentMonthTimes(year, month) {
  const startTime = new Date(`${year}/${month}/01 00:00:00`);
  let endTime;
  if (month == 12) {
    endTime = new Date(`${year+1}/01/01 00:00:00`);
  } else {
    endTime = new Date(`${year}/${month+1}/01 00:00:00`);
  }
  return [startTime, endTime];
}


// カレンダーからイベントを取得
function parseCalendarEvents(cal, startTime, endTime) {
  const calEvents = cal.getEvents(startTime, endTime);
  let events = [];
  for (const calEvent of calEvents) {
    const eventTitle = calEvent.getTitle();
    const [eventName, eventLabel] = parseEventTitle(eventTitle);
    const startTime = calEvent.getStartTime();
    const endTime = calEvent.getEndTime();
    const workTime = getWorkTime(startTime, endTime);
    // 終日のイベントはスキップ
    if (workTime >= 1440) {
      continue;
    }
    const event = {
      eventName: eventName,
      label: eventLabel,
      date: dateToString(startTime),
      startTime: startTime,
      endTime: endTime,
      workTime: getWorkTime(startTime, endTime),
    };
    events.push(event);
  }
  return events;
}

const UNDEFINED_LABEL = "未分類";

// イベントタイトルをパースする
// "[label] eventName" の形式のイベントをパースし、イベント名とラベルを返す
// labelがない場合は、タイトル全体をイベント名とし、ラベルは”未分類”とする
function parseEventTitle(title) {
  let eventName = title.trim();
  const group = eventName.match(/\[(.*)\](.*)/);
  let eventLabel;
  if (group && group.length > 0) {
    eventLabel = group[1].trim();
    eventName = group[2].trim();
  } else {
    eventLabel = UNDEFINED_LABEL;
  }
  return [eventName, eventLabel];
}

// 作業時間の計算（時間）
function getWorkTime(startTime, endTime) {
  return (endTime.getTime() - startTime.getTime()) / 1000 / 60 / 60
}

// dateを文字列2022/1/1のような文字列に変換
function dateToString(date) {
  const _year = date.getFullYear();
  const _month = date.getMonth() + 1;
  const _date = date.getDate();
  return `${_year}/${_month}/${_date}`;
}


// 日付ごと、ラベルごとの作業合計時間を求める
function getTotalTimeByLabel(events) {
  summaries = {};
  for (const event of events) {
    if (summaries[event.eventName] === undefined) {
      summaries[event.eventName] = 0;
    }
    // if (summaries[event.date][event.label] === undefined) {
    //   summaries[event.date][event.label] = 0;
    // }
    // if (event.eventName !== this.targetLabel) {
    //   continue
    // }
    summaries[event.eventName] += event.workTime;
  }
  return summaries;
}

function myFunction() {
  // 対象年月取得
  const spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  const targetYear = spreadSheet.getRange(this.year).getValue()
  const targetMonth = spreadSheet.getRange(this.month).getValue()
  const [startTime, endTime] = getCurrentMonthTimes(targetYear,targetMonth)


  // カレンダーデータの取得
    // ログインしているユーザのカレンダーを取得
  const calendar = CalendarApp.getCalendarById(Session.getActiveUser().getEmail());

    // イベントを取得
  const events = parseCalendarEvents(calendar, startTime, endTime);

  // イベントの読み出し
  const summaries = getTotalTimeByLabel(events)


console.log(summaries[targetLabel])
spreadSheet.getRange(render).setValue(summaries[targetLabel])

}

