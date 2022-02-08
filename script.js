const quote = document.querySelector('.quote');
const random = document.querySelector('.random');
const back = document.querySelector('.back');
const forward = document.querySelector('.forward');
const history = [];
let stateOfHistory = 0;

function getRandomNumber(max) {
  const min = 0;
  const random = Math.floor(Math.random() * (max - min + 1) + min);
  return random;
}

async function getQuote() {
  fetch("https://type.fit/api/quotes")
  .then(response => {
    return response.json();
  })
  .then(data => {
    const random = getRandomNumber(data.length - 1);
    quote.innerHTML = `<p>${data[random].text}</p> <span>${data[random].author}</span>`
    history.push({
      author: data[random].author,
      text: data[random].text
    });
    stateOfHistory = history.length - 1;
  });
}

random.addEventListener('click', () => {
  getQuote();
  console.log(history);
})

back.addEventListener('click', () => {
  if (stateOfHistory !== 0) {
    quote.innerHTML = `<p>${history[stateOfHistory - 1].text}</p> <span>${history[stateOfHistory - 1].author}</span>`;
    stateOfHistory--;
  }
})

forward.addEventListener('click', () => {
  if (stateOfHistory < history.length - 1) {
    quote.innerHTML = `<p>${history[stateOfHistory + 1].text}</p> <span>${history[stateOfHistory + 1].author}</span>`;
    stateOfHistory++;
  }
})

getQuote();