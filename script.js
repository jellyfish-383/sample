document.getElementById('connect-button').addEventListener('click', async () => {
  try {
    const device = await navigator.bluetooth.requestDevice({
      filters: [
        // 名前でフィルタ（任意）
        { name: 'MyDeviceName' },
        // 特定のサービスでフィルタ
        { services: ['battery_service'] }
      ]
    });

    document.getElementById('status').textContent = `選択されたデバイス: ${device.name}`;

    const server = await device.gatt.connect();
    console.log('接続成功:', server);

    document.getElementById('status').textContent = `接続中: ${device.name}`;

    // 例: battery service にアクセス
    const service = await server.getPrimaryService('battery_service');
    const characteristic = await service.getCharacteristic('battery_level');
    const value = await characteristic.readValue();
    const batteryLevel = value.getUint8(0);

    console.log(`バッテリーレベル: ${batteryLevel}%`);
    alert(`バッテリーレベル: ${batteryLevel}%`);
  } catch (error) {
    console.error('接続失敗またはキャンセル:', error);
    document.getElementById('status').textContent = '接続失敗またはキャンセル';
  }
});
