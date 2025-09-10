import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', event => {
  event.preventDefault();
  const state = event.currentTarget.elements.state.value;
  const delay = Number(event.currentTarget.elements.delay.value);
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      state === 'fulfilled' ? resolve() : reject();
    }, delay);
  });
  promise
    .then(() =>
      iziToast.success({
        message: `Fulfilled promise in ${delay}ms`,
      })
    )
    .catch(() =>
      iziToast.error({
        message: `Rejected promise in ${delay}ms`,
      })
    );
});
