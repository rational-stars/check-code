utools.onPluginEnter(() => {
  if (!utools.isMacOS()) utools.copyText("必须得是Mac喔！！！");
  const sqlite3 = require("sqlite3").verbose();
  const os = require("os");
  const { homedir } = os.userInfo();
  const dbPath = `${homedir}/Library/Messages/chat.db`;
  const query = `SELECT text FROM message WHERE datetime(date/1000000000 + 978307200, 'unixepoch', 'localtime') > datetime('now', 'localtime', '-60 second') ORDER BY date DESC LIMIT 1;`;
  const db = new sqlite3.Database(dbPath);
  const keyword = "验证码";
  const codeReg = /[0-9]{4,6}/;
  db.serialize(() => {
    db.get(query, (err, row) => {
      if (err) utools.copyText("信息读取失败啦！！！");
      if (!row || !row.text.includes(keyword)) utools.copyText("最近一分钟内未收到验证码消息");
      utools.copyText(row.text.match(codeReg)[0]);
      utools.shellBeep()// 这个播放哔哔声 好像不能用  如果utools有其他提示 请联系我更改
    });
  });
  db.close();
  return utools.hideMainWindow();
});
// utools 版
