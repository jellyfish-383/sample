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
        console.error("接続エラー:", error);
        alert("接続に失敗しました: " + error.message);
    }
});
  
document.getElementById('btnon').addEventListener('click', async () => {
  if (characteristic) {
　　    const data = new TextEncoder().encode('1').buffer;
　　    await characteristic.writeValue(data);
        alert('ON 信号送信');
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
