navigator.bluetooth.requestDevice({
  filters: [{ services: ['00001101-0000-1000-8000-00805F9B34FB'] }]  // SPP (Serial Port Profile)
})
.then(device => {
  return device.gatt.connect();
})
.then(server => {
  return server.getPrimaryService('00001101-0000-1000-8000-00805F9B34FB');  // SPPサービス
})
.then(service => {
  // シリアル通信でデータを読み書き
  return service.getCharacteristic('00001101-0000-1000-8000-00805F9B34FB');
})
.then(characteristic => {
  // データの読み書き（例えば、文字列を送信する）
  return characteristic.writeValue(new TextEncoder().encode('Hello, HM-10!'));
})
.then(() => {
  console.log('データが送信されました');
})
.catch(error => {
  console.log('エラー:', error);
});
