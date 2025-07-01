let characteristic = null;

document.getElementById('connect').addEventListener('click', async () => {
  try {
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ namePrefix: 'HM' }],
      optionalServices: ['0000ffe0-0000-1000-8000-00805f9b34fb']
    });

    const server = await device.gatt.connect();
    const service = await server.getPrimaryService('0000ffe0-0000-1000-8000-00805f9b34fb');
    characteristic = await service.getCharacteristic('0000ffe1-0000-1000-8000-00805f9b34fb');

    console.log('Characteristic properties:', characteristic.properties);

    // 書き込み権限の確認（できれば）
    if (!characteristic.properties.write && !characteristic.properties.writeWithoutResponse) {
      alert('このキャラクタリスティックは書き込みできません');
      return;
    }

    await characteristic.writeValue(new TextEncoder().encode('1'));

    console.log("Bluetooth 接続完了");
    alert("Bluetooth 接続完了");
  } catch (error) {
    console.error("接続エラー:", error);
    alert("接続に失敗しました: " + error.message);
  }
});

  
document.getElementById('btnon').addEventListener('click', async () => {
  if (characteristic) {
    try {
      const data = new TextEncoder().encode('1');
      await characteristic.writeValue(data);
      alert('ON 信号送信');
    } catch (error) {
      console.error("送信エラー:", error);
      alert("送信エラー: " + error.message);
    }
  } else {
    alert('先に Bluetooth に接続してください。');
  }
});

document.getElementById('btnoff').addEventListener('click', async () => {
  if (characteristic) {
    const data = new TextEncoder().encode('0');
    await characteristic.writeValue(data);
    alert('OFF 信号送信');
  } else {
    alert('先に Bluetooth に接続してください。');
  }
});
