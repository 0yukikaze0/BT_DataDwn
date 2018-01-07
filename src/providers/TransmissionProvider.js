var req = require('request-promise');

class TransmissionProvider{
    constructor(){
    }

    /**
     * 
     * @param {string} url 
     * @param {Object} paramMap 
     * @param {Object} headers 
     */
    transmitGetRequest(url, paramMap, headers){
        return new Promise( (resolve, reject) => {
            
            let options = {
                uri : url,
                qs: paramMap,
                headers : headers,
                json: true
            }
    
            req(options)
                .then((response) => {
                    resolve(response);
                })
                .catch((e) => {console.log(e)})
        });

    }
}

module.exports = TransmissionProvider;