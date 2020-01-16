const words = [
  'const', 'let', 'var',
  'function',
  'console.log', 'console.clear', 'console.error',
  'document', 'addEventListener',
  'getElementsByTagName', 'getElementsByClassName', 'getElementById',
  'querySelectorAll', 'querySelector',
  'document.createElement',
  'history.back', 'history.forward'
];

const inputSearch = document.getElementById('search');
const ulList = document.getElementById('list');

words.forEach(w => ulList.innerHTML += '<li>' + w + '</li>')

inputSearch.addEventListener('change', (e) => {
  console.clear();

  document.getElementById('result').textContent = 'Result = ' + nearWord(words, e.target.value);
});