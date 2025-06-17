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

document.getElementById('connect').addEventListener('click', async () => {
  try {
    // ユーザーのクリックイベント内で Bluetooth デバイスのリクエストを行う
    await scanBluetoothDevice();
  } catch (error) {
    console.error('Error:', error);
  }
});

async function scanBluetoothDevice() {
  try {
    // ユーザーのジェスチャー（クリック）内でデバイスリクエストを実行
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ namePrefix: 'HM' }],
      optionalServices: [0xFFE0]  // サービスUUID
    });

    console.log('Connected to device:', device.name);

    // デバイスに接続
    const server = await device.gatt.connect();
    console.log('Connected to GATT server.');

    // サービスを取得
    const services = await server.getPrimaryServices();
    console.log('Services:', services);

    // サービスごとにキャラクタリスティックを取得
    for (const service of services) {
      console.log('Service UUID:', service.uuid);
      const characteristics = await service.getCharacteristics();
      for (const characteristic of characteristics) {
        console.log('Characteristic UUID:', characteristic.uuid);
      }
    }

  } catch (error) {
    console.error('Error:', error);
  }
}

document.getElementById('btnon').addEventListener('click', async () => {
  try {
    if (characteristic) {
      const data = new TextEncoder().encode('1');
      await characteristic.writeValue(data);
      alert('ON 信号送信');
    } else {
      alert('先に Bluetooth に接続してください。');
    }
  } catch (error) {
    console.error('送信エラー:', error);
    alert('送信に失敗しました: ' + error.message);
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
