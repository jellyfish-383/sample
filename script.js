/*
let characteristic = null;


document.getElementById('connect').addEventListener('click', async () => {
          try {
            const device = await navigator.bluetooth.requestDevice({
              filters: [{ namePrefix: 'HM' }],
              optionalServices: [0xFFE0]
            });
    
            const server = await device.gatt.connect();
            const service = await server.getPrimaryService(0xFFE0);
            characteristic = await service.getCharacteristic(0xFFE1);
            await characteristic.writeValue(new TextEncoder().encode('1'));  // Arduinoに'1'を送信

       
          } catch (error) {
            console.error('Bluetooth connection failed:', error);
          }
        });


document.getElementById('btnoff').addEventListener('click', async () => {
  if (characteristic) {
    const data = new TextEncoder().encode('0');
    await characteristic.writeValue(data);
    alert('0 を送信しました（OFF）');
  } else {
    alert('先に Bluetooth に接続してください。');
  }
});


document.getElementById('btnon').addEventListener('click', async () => {
  if (characteristic) {
    const data = new TextEncoder().encode('1');
    await characteristic.writeValue(data);
    alert('1を送信しました（ON）');
  } else {
    alert('先に Bluetooth に接続してください。');
  }
});

let characteristic = null;

document.getElementById('connect').addEventListener('click', async () => {
  try {
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ namePrefix: 'HM' }],
      optionalServices: [0xFFE0]
    });

    const server = await device.gatt.connect();
    const service = await server.getPrimaryService(0xFFE0);
    characteristic = await service.getCharacteristic(0xFFE1);
    await characteristic.writeValue(new TextEncoder().encode('1'));

    console.log("Bluetooth 接続完了");
    alert("Bluetooth 接続完了");

  } catch (error) {
    console.error('Bluetooth connection failed:', error);
    alert("接続失敗");
  }
});


document.getElementById('btnon').addEventListener('click', async () => {
  if (characteristic) {
　　　const data = new TextEncoder().encode('1').buffer; // .bufferを追加
　　　await characteristic.writeValue(data);
    alert('ON 信号送信');
  } else {
    alert('先に Bluetooth に接続してください。');
  }
});
*/

let characteristic = null;

document.getElementById('connect').addEventListener('click', async () => {
  try {
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ namePrefix: 'HM' }],
      optionalServices: [0xFFE0]
    });

    const server = await device.gatt.connect();
    console.log('Bluetooth connected:', device.name); // 接続確認
    const service = await server.getPrimaryService(0xFFE0);
    characteristic = await service.getCharacteristic(0xFFE1);

    if (characteristic) {
      console.log('Characteristic found:', characteristic);
      alert('Bluetooth 接続完了');
    } else {
      console.log('Characteristic not found');
      alert('Characteristic が見つかりませんでした。');
    }
  } catch (error) {
    console.error('Bluetooth connection failed:', error);
    alert("接続失敗: " + error.message);
  }
});

document.getElementById('btnon').addEventListener('click', async () => {
  if (characteristic) {
    try {
      const data = new TextEncoder().encode('1').buffer; // ArrayBuffer に変換
      await characteristic.writeValue(data);
      alert('ON 信号送信');
    } catch (error) {
      console.error('送信エラー:', error); // 詳細なエラーメッセージ
      alert('送信エラー: ' + error.message);
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



// スライダーのイベント登録
document.getElementById('brightness').addEventListener('input', async (event) => {
  if (!characteristic) {
    alert('先に Bluetooth に接続してください。');
    return;
  }

  const value = parseInt(event.target.value);
  try {
    // 1バイトのUint8Arrayで送信
    await characteristic.writeValue(Uint8Array.of(value));
    console.log(`Brightness set to: ${value}`);
  } catch (error) {
    console.error('送信エラー:', error);
  }
});
