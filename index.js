const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// ルートの設定
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// クライアントが接続したときの処理
io.on('connection', (socket) => {
  console.log('A user connected');

  // メッセージを受信したときの処理
  socket.on('chat message', (msg) => {
    console.log('Message: ' + msg);

    // 受信したメッセージを全クライアントに送信
    io.emit('chat message', msg);
  });

  // クライアントが切断したときの処理
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// サーバーを起動
server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
