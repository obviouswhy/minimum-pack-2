const doPost = (request) => {

    //値の受取り
    const email = request.parameter.email;
    const body = request.parameter.body;
    const channel = request.parameter.channel;

    //エラー処理
    const email_exp = /^[a-z0-9.]+@[a-z0-9.]+\.[a-z]+$/;
    const body_exp = /^.{1,10}$/;

    //問題があればエラーを返す（なければ処理を継続）
    if(!email_exp.test(email) || !body_exp.test(body)){
      return ContentService.createTextOutput("エラーです。");
    }

    //スプレッドシートの準備
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("シート1");

    //シートの一番下の行に追加
    sheet.appendRow([email, body, channel, new Date()]);

    //応答
    return ContentService.createTextOutput("受付けました。");
  }