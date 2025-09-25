let bleDevice;
let bleCharacteristic;

const connectBtn = document.getElementById("connectBtn");
const slider = document.getElementById("slider");
const valueLabel = document.getElementById("valueLabel");
const log = document.getElementById("log");

// ログ出力
function logMessage(msg) {
  log.innerText = `[LOG] ${msg}`;
}

// HM-10 に接続
async function connectToHM10() {
  try {
    const serviceUUID = '0000ffe0-0000-1000-8000-00805f9b34fb';
    const characteristicUUID = '0000ffe1-0000-1000-8000-00805f9b34fb';

    logMessage("BLEデバイスを検索中…");

    bleDevice = await navigator.bluetooth.requestDevice({
      filters: [{ services: [serviceUUID] }]
    });

    const server = await bleDevice.gatt.connect();
    const service = await server.getPrimaryService(serviceUUID);
    bleCharacteristic = await service.getCharacteristic(characteristicUUID);

    logMessage("✅ HM-10 に接続成功！");
  } catch (error) {
    console.error(error);
    logMessage("❌ 接続失敗: " + error);
  }
}

// BLE で値を送信
async function sendValue(value) {
  if (!bleCharacteristic) {
    logMessage("⚠️ まずはBLEに接続してください。");
    return;
  }

  const command = `SET ${value}\n`; // 改行必須！
  const encoder = new TextEncoder();
  const data = encoder.encode(command);

  try {
    await bleCharacteristic.writeValue(data);
    logMessage(`送信: "${command.trim()}"`);
  } catch (err) {
    console.error(err);
    logMessage("送信失敗: " + err);
  }
}

// UIイベント
connectBtn.addEventListener("click", connectToHM10);

slider.addEventListener("input", () => {
  const value = slider.value;
  valueLabel.textContent = value;
  sendValue(value);
});
