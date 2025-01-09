let timer;
let seconds = 0;
let isRunning = false;

// Format time
function formatTime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hrs.toString().padStart(2, '0')}:${mins
    .toString()
    .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Update display
function updateDisplay() {
  document.getElementById('display').textContent = formatTime(seconds);
}

// Start stopwatch
function startStopwatch() {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(() => {
      seconds++;
      updateDisplay();
    }, 1000);
  }
}

// Stop stopwatch
function stopStopwatch() {
  if (isRunning) {
    isRunning = false;
    clearInterval(timer);
  }
}

// Reset stopwatch
function resetStopwatch() {
  stopStopwatch();
  seconds = 0;
  updateDisplay();
}

// Speech recognition
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';
recognition.continuous = true;

recognition.onresult = (event) => {
  const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
  if (transcript === 'start') {
    startStopwatch();
  } else if (transcript === 'stop') {
    stopStopwatch();
  } else if (transcript === 'reset') {
    resetStopwatch();
  }
};

recognition.onerror = (event) => {
  console.error('Speech recognition error:', event.error);
};

// Start speech recognition
recognition.start();
