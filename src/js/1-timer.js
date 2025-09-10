import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const dataTimeEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let userSelectedDate = null;
let timer = null;

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < new Date()) {
      startBtn.disabled = true;
      iziToast.error({
        title: '',
        message: 'Please choose a date in the future',
      });
    } else {
      startBtn.disabled = false;
      startBtn.classList.add('button-active');
    }
  },
};
const picker = flatpickr(dataTimeEl, options);

startBtn.addEventListener('click', onStart);

function onStart() {
  startBtn.disabled = true;
  dataTimeEl.disabled = true;
  startBtn.classList.remove('button-active');

  timer = setInterval(() => {
    const currentDate = new Date();
    const deltaTime = userSelectedDate - currentDate;

    if (deltaTime <= 0) {
      clearInterval(timer);
      updateTimerFace({ days: 0, hours: 0, minutes: 0, seconds: 0 });

      dataTimeEl.disabled = false;
      return;
    }

    const time = convertMs(deltaTime);
    updateTimerFace(time);
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimerFace({ days, hours, minutes, seconds }) {
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}
