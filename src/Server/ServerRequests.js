import axios from "axios";
import { createProxyMiddleware } from "http-proxy-middleware";
const proxy=createProxyMiddleware({
    target:'http://apps.codebetter.in:8082',
    changeOrigin:true,
    onProxyReq: function (proxyReq, req, res) {
        // Add custom headers or change the method of the proxy request
        if (req.method === 'POST') {
          proxyReq.method = 'POST';
          proxyReq.setHeader('Content-Type', 'application/json');
        }
      },
})
function GetRequest(URL, token) {
    return axios.get(URL, {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
}

function PostRequest(URL, data) {
    return axios.post(URL,{
        data:data,
        baseURL: '/api',
    });
}

function SpecialPostRequest(URL, data, token) {
    return axios.post(URL, data, {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
}

function PutRequest(URL,token,data){
    return axios.put(URL,data,{
        headers: {
            "Authorization": "Bearer " + token
        }
    })
}

function SpecialPutRequest(URL,token,data){
    return axios.put(URL,data,{
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type":'multipart/form-data'
        }
    })
}

function ImagePostRequest(URL,token,data,isImage){
    if(isImage){
        return axios.post(URL,data,{
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type":'multipart/form-data'
            }
        })
    }else{
        return axios.post(URL,data,{
            headers: {
                "Authorization": "Bearer " + token
            }
        })
    }
}

export {
    GetRequest, PostRequest,SpecialPostRequest,PutRequest,SpecialPutRequest,ImagePostRequest
};