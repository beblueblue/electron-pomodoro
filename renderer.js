const {
  ipcRenderer
} = require('electron');
const Timer = require('timer.js')

function startWork() {
  let workTimer = new Timer({
    ontick: (ms) => {
      updateTimer(ms);
    },
    onend: () => {
      notification()
    }
  })
  workTimer.start(5)
}

function updateTimer(ms) {
  let timerContainer = document.getElementById('timer-container')
  let s = (ms / 1000).toFixed(0)
  let ss = s % 60
  let mm = (s / 60).toFixed(0)
  timerContainer.innerText = `${mm.toString().padStart(2, 0)} : ${ss.toString().padStart(2, 0)}`;
}

async function notification() {
  let res = await ipcRenderer.invoke('work-notification')

  if (res === 'rest') {
    setTimeout(() => {
      alert('休息')
    }, 4 * 1000)
  } else if (res === 'work') {
    startWork();
  }
}

startWork();
