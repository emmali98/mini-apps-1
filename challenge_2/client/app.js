const form = document.getElementById('form');
const input = document.getElementById('json');
const csv = document.getElementById('csv');

// Handling file submission
var handleSubmit = (e) => {
  e.preventDefault();
  csv.innerHTML = '';

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
      csv.append(data);
    }
  })
}

form.onsubmit = handleSubmit;

// Formatting CSV
csv.style.whiteSpace = 'pre-wrap';
