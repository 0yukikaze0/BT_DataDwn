var fs = require('fs');
var os = require('os');
var lodash = require('lodash');
var config = require('config');
var TransmissionProvider = require('./src/providers/TransmissionProvider')

class Index{
    constructor(){
        this._apiUrl = config.get('api.url');
        this._endpoints = config.get('api.endpoints');
        this._transmission = new TransmissionProvider();
    }

    getTicker(market){
        let paramMap = {
            market : market
        }
        let date = new Date();
        this._transmission.transmitGetRequest(this._apiUrl + this._endpoints.ticker, paramMap)
            .then((response) => {
                let subject = {
                    date : date.toLocaleString() + ':' + date.getMilliseconds(),
                    timeStamp : date.getTime(),
                    data : response.result
                }
                console.log(JSON.stringify(subject));
                fs.appendFileSync('./data', JSON.stringify(subject) + os.EOL);
            })
    }

    _getTimeStamp(date){
        return Math.round(date.getTime() / 1000);
    }

    execute(){
        setInterval(()=>{this.getTicker('BTC-XRP')}, 1000);
    }
}

new Index().execute();



