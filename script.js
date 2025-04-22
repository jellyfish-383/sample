const status = document.getElementById('status');

document.getElementById('connect-specific').addEventListener('click', async () => {
  try {
    const device = await navigator.bluetooth.requestDevice({
      filters: [
        { name: 'MyDeviceName' }, // ← ここを実際のデバイス名に
        { services: ['battery_service'] } // ← 使用するサービスUUID
      ]
    });

    await connectToDevice(device);
  } catch (error) {
    console.error('フィルタ付き接続キャンセル:', error);
    status.textContent = '接続キャンセル（フィルタ付き）';
  }
});

document.getElementById('connect-any').addEventListener('click', async () => {
  try {
    const device = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true,
      optionalServices: ['battery_service'] // 任意で読み取り対象サービスを追加
    });

    await connectToDevice(device);
  } catch (error) {
    console.error('全デバイス接続キャンセル:', error);
    status.textContent = '接続キャンセル（全デバイス）';
  }
});

async function connectToDevice(device) {
  status.textContent = `選択されたデバイス: ${device.name}`;
  const server = await device.gatt.connect();
  console.log('接続成功:', server);
  status.textContent = `接続中: ${device.name}`;

  try {
    const service = await server.getPrimaryService('battery_service');
    const characteristic = await service.getCharacteristic('battery_level');
    const value = await characteristic.readValue();
    const batteryLevel = value.getUint8(0);
    alert(`🔋 バッテリーレベル: ${batteryLevel}%`);
  } catch (error) {
    console.warn('バッテリーレベル取得失敗:', error);
    alert('サービスは見つかりましたが、値の取得に失敗しました。');
  }
}
