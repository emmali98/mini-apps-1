const form = document.getElementById('form');
const input = document.getElementById('json');

// Handling file submission
var handleSubmit = (e) => {
  e.preventDefault();
}
form.onsubmit = handleSubmit;

// Formatting CSV
document.getElementById('crv').style.whiteSpace = 'pre-wrap';
