const frisby = require("frisby");

const api_url = "https://script.google.com/macros/s/AKfycbw2qmWFA1dcgDIm7UZABm6FYyFnLE3Teejuf7dJ43Ax61t-a2YSN4i1mdU5HlYCJQBCyg/exec";

it("GAS APIテスト：正常", async () => {
    const res = await frisby.post(api_url, {
        body: "email=test@test.local&body=foooooo&channel=unit-test",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
    expect(res._body).toBe("受付けました。");
});

it("GAS APIテスト：Email不正", async () => {
    const res = await frisby.post(api_url, {
        body: "email=test&body=foooooo&channel=unit-test",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
    expect(res._body).toBe("エラーです。");
});

it("GAS APIテスト：問合せ内容不正", async () => {
    const res = await frisby.post(api_url, {
        body: "email=test@test.local&body=foooooooooooooo&channel=unit-test",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
    expect(res._body).toBe("エラーです。");
});