у меня нода стоит в C:\Program Files\nodejs\, и переменные среды я не трогал, так что юзается полный путь до ноды.

в ноду надо поставить socket.io. делается через cmd:
npm install socket.io
ну или так:
"C:\Program Files\nodejs\npm" install socket.io
(кстати ставится довольно долго для такой простой хрени)

что бы игра завелась, нужно поднять сервак (/server/run.bat) и открыть две вкладки localhost:8080.

в game.html есть адрес:
http://localhost:8080/socket.io/socket.io.js
после поднятия сервака он будет активным.

инфа на всякий пожарный