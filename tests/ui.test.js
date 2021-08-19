const { Builder, By } = require("selenium-webdriver");
const { alertIsPresent } = require("selenium-webdriver/lib/until");
const fs = require("fs");
require("chromedriver");

//HOMEのテスト
it("HOMEページタイトルテスト", async () => {

    //chromeを取得
    const driver = await new Builder().forBrowser("chrome").build();
    //ページに移動
    await driver.get("https://obviouswhy.github.io/minimum-pack/");
    //タイトル取得
    const title = await driver.getTitle();
    //評価
    expect(title).toBe("minimum-web: Home");
    //終了
    await driver.quit();

});

//Contactのテスト
it("Contactフォームテスト", async () => {

    //chromeを取得
    const driver = await new Builder().forBrowser("chrome").build();
    //ページに移動
    await driver.get("https://obviouswhy.github.io/minimum-pack/contact.html");
    //タイトルsyつ億
    const title = await driver.getTitle();
    //タイトル評価
    expect(title).toBe("minimum-web: Contact");

    //formの操作
    //email取得し入力
    const email = await driver.findElement(By.id("email"));
    email.sendKeys("test@test.local");

    //body取得し入力
    const body = await driver.findElement(By.id("body"));
    body.sendKeys("hogehoge");

    //btn取得とクリック
    const btn = await driver.findElement(By.id("btn"));
    btn.click();

    //alertが出るまで待つ
    await driver.wait(alertIsPresent(), 5000);

    //アラートに移動
    const alert = await driver.switchTo().alert();
    //アラートメッセージ取得
    const alertText = await alert.getText();
    //評価
    expect(alertText).toBe("受付けました。");
    //alertのOKを押す
    await alert.accept();
    //終了
    await driver.quit();

});
