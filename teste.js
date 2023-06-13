const http = require("http");

function cliente(args, callback){
    let urlbase = "http://localhost:3000"
    http
    .get(urlbase+'/api/mac/Z94k8opK3mlJhDLaWVN7Qhd6KPdYB087BeCty6teQyKLnK49BP/'+args, (res) => {
    //   if (res.statusCode !== 200)
    //     return callback(
    //       new Error(`Request failed (status code: ${res.statusCode})`)
    //     );

        let rawData = "";
        res.on("data", (chunk) => (rawData += chunk));

      res.on("end", () => {
        let data = JSON.parse(rawData)
        //console.log(data[0])
        let macfinal = data[0].mac_address.split(':')
        let nome = data[0].nome_razaosocial.split(' ')
        let ssid = nome[0] + '_TUXNET_' + macfinal[4] + macfinal[5]
        let ssid5g = nome[0] + '_TUXNET_' + macfinal[4] + macfinal[5] + '_5G'
        let password = 'tuxnet'+data[0].password
        let result = {
            login: data[0].login,
            senha: data[0].password,
            ssid: ssid,
            ssid5g: ssid5g,
            password: password
        }
        console.log(result)
      // callback(null, result);
      });

    })

        .on("error", (err) => {
       // callback(err);
        });
}

cliente('40:3F:8C:9B:3A:A6', null)
//exports.getCliente = cliente;
