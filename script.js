        document.getElementById('connect').addEventListener('click', async () => {
          try {
            const device = await navigator.bluetooth.requestDevice({
              filters: [{ namePrefix: 'HM' }],
              optionalServices: [0xFFE0]
            });
    
            const server = await device.gatt.connect();
            const service = await server.getPrimaryService(0xFFE0);
            const characteristic = await service.getCharacteristic(0xFFE1);
            await characteristic.writeValue(new TextEncoder().encode('1'));  // Arduinoに'1'を送信

       
          } catch (error) {
            console.error('Bluetooth connection failed:', error);
          }
        });


        document.getElementById('0').addEventListener('click', async () => {
 
            await characteristic.writeValue(new TextEncoder().encode('0'));  // Arduinoに'0'を送信

       
          } catch (error) {
            console.error('Bluetooth connection failed:', error);
          }
        });


        document.getElementById('1').addEventListener('click', async () => {
 
            await characteristic.writeValue(new TextEncoder().encode('1'));  // Arduinoに'1'を送信

       
          } catch (error) {
            console.error('Bluetooth connection failed:', error);
          }
        });
