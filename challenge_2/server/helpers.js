var currentCSV = '';

var getCSVfromJSON = (string, callback) => {
  try {
    var json = JSON.parse(string);
    var keys = Object.keys(json).filter((key) => key !== 'children');
    var csv = keys.join(',');

    var helper = (obj) => {
      var newRow = [];
      for (var key in obj) {
        if (key !== 'children') {
          newRow.push(obj[key])
        }
      }
      csv += '\n' + newRow.join(',');

      if (obj.children && obj.children.length > 0) {
        obj.children.forEach((child) => { helper(child); });
      }
    };
    helper(json);

    callback(null, csv);
  } catch (err) {
    callback(err);
  }
};

module.exports = {
  getCSVfromJSON: getCSVfromJSON,
  currentCSV: currentCSV
}
