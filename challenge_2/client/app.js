const form = document.getElementById('form');
const input = document.getElementById('json');
const crv = document.getElementById('crv');

// Handling file submission
var handleSubmit = (e) => {
  e.preventDefault();
  crv.innerHTML = '';

  var formData = new FormData();
  formData.append('file', input.files[0]);

  $.ajax({
    type: 'POST',
    url: '/',
    data: formData,
    processData: false,
    contentType: false,
    success: (data) => {
      console.log('File posted!');
      crv.append(data);
    }
  })
}

form.onsubmit = handleSubmit;

// Formatting CSV
crv.style.whiteSpace = 'pre-wrap';
