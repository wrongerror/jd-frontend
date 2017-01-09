/**
 * Created by guoyu on 2016/10/7.
 */
import http from 'http'
import request from 'request'

export default class Network {
    constructor() {
        this.headers={}
    }

    /**
     * dict
     * @param headers
     */
    setHeaders(headers){
        this.headers=headers;
        return this
    }

    post(action, data,isformatjson){
        this.action=action;
        this.data=data;
        this.method='POST';
        if(isformatjson){
            this.data=JSON.parse(this.data)
        }
        return this._request()
    }
    get(action){
        this.action=action;
        this.data='';
        this.method='GET';
        return this._request()
    }
    setTimeout(timeout){
        this.timeout=timeout;
        return this
    }
    setApiHost(host){
        this.api_host=host;
        return this
    }
    _request(){
        var that=this;
        if(this.api_host==undefined){
            this.api_host='/'
        }
        return new Promise(function(resolve, reject) {
            var options = {
                url: 'http://xiyi.api.wedor.cn'+that.action,
                headers: that.headers
            };
            var callback=function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    try{
                        resolve(JSON.parse(body))
                    }catch (e) {
                        resolve(body)
                    }
                }else{
                    reject(error)
                }
            };
            if(that.method=='POST') {
                if (typeof that.data == 'string') {
                    options.body = that.data
                }else{
                    options.json=that.data
                }
                request.post(options,callback)
            }else{
                request(options,callback)
            }
        });
    }

}