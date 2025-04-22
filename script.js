const knob = document.getElementById('knob');
let isDragging = false;
let lastAngle = 0;

knob.addEventListener('mousedown', (e) => {
  isDragging = true;
  const rect = knob.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

navigator.bluetooth.requestDevice({
  filters: [
    { name: 'MyDevice' }, // 名前でフィルタ
    { services: ['battery_service'] } // 特定のサービスだけ許可
  ]
})
  
  const getAngle = (x, y) => {
    return Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
  };

  const onMouseMove = (moveEvent) => {
    if (isDragging) {
      const angle = getAngle(moveEvent.clientX, moveEvent.clientY);
      const delta = angle - lastAngle;
      knob.style.transform = `rotate(${delta}deg)`;
    }
  };

  const onMouseUp = () => {
    isDragging = false;
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  };

  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
});
