import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', event => {
  event.preventDefault();
  const state = event.currentTarget.elements.state.value;
  const delay = Number(event.currentTarget.elements.delay.value);
  const promise = new Promise((resolve, reject) => {
    if (state === 'fulfilled') {
      setTimeout(
        () =>
          resolve(
            iziToast.success({
              message: `Fulfilled promise in ${delay}ms`,
            })
          ),
        delay
      );
    } else {
      setTimeout(
        () =>
          reject(
            iziToast.error({
              message: `Rejected promise in ${delay}ms`,
            })
          ),
        delay
      );
    }
  });
  promise
    .then(result => console.log(result))
    .catch(error => console.log(error));
});
