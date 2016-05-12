function hello() {
  var element = document.createElement('h1');
  element.innerHTML = 'HELLO WORLD!';
  return element;
}

document.body.appendChild(hello());