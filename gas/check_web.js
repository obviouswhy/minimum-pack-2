const checkWeb = () => {

    //チェック対象のサイト
    const check_url = "https://obviouswhy.github.io/minimum-pack/";
  
    //リクエストを投げる
    const response = UrlFetchApp.fetch(check_url, {
      muteHttpException: true,
    });
  
    //ステータスをチェック
    if (response.getResponseCode() === 200) {
      //内容チェック
      const title_exp = /<title>(.*?)<\/title>/;
      const titleArray = response.getContentText().match(title_exp);
      const title = titleArray[1];
      if (title === "minimum-web: Home1") {
        //何もしない
        console.log("正常です。");
      } else {
        MailApp.sendEmail({
          to: "snogal.cm@gmail.com",
          subject: "警告：コンテンツの書き換え検知",
          htmlBody: `サイトはダウンしていないようですがコンテンツが期待値と違います。`
        });
      }
  
    } else {
      MailApp.sendEmail({
        to: "snogal.cm@gmail.com",
        subject: "警告：サイトダウンを検知",
        htmlBody: `サイトのダウンを検知しました。確認してください。`
      });
    }
  
  }