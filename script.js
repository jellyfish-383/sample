        document.getElementById('connect').addEventListener('click', async () => {
          try {
            const device = await navigator.bluetooth.requestDevice({
              acceptAllDevices: true,
                filters: [
                        { name: 'web bluetooth api' }  // デバイス名でフィルタリング
                ],      
              optionalServices: ['battery_service'] // 仮でバッテリーサービス
                    .then(device => {
  console.log('選択されたデバイス:', device.name);
})
.catch(error => {
  console.error('エラー:', error);
});
            });
    
            const server = await device.gatt.connect();
            const service = await server.getPrimaryService('battery_service');
            const characteristic = await service.getCharacteristic('battery_level');
            const value = await characteristic.readValue();
    
            const batteryLevel = value.getUint8(0);
            alert('Battery level: ' + batteryLevel + '%');
    
          } catch (error) {
            console.error('Bluetooth connection failed:', error);
          }
        });


