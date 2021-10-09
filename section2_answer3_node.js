
const http = require('http');

const options = {
  host: 'codequiz.azurewebsites.net',
  path: '/',
  headers: { 'Cookie': 'hasCookie=true' }
}

const request = http.request(options, function (res) {
  let data = '';
  res.on('data', function (chunk) {
    data += chunk;
  });
  res.on('end', function () {
    let table = data.split("<table>")[1].split("</table>")[0].split("<tr>")

    table = table.filter(row => row.includes("<td>"))

    let obj = {}
    table.forEach(row => {
      let key = row.split("<td>")[1].replace("</td>", "").trim()
      let value = row.split("<td>")[2].replace("</td>", "").trim()
      obj[key] = value
    })

    console.log(obj[process.argv[2]]);

  });
});

request.on('error', function (e) {
  console.log(e.message);
});

request.end();




