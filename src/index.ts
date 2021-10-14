import fetch from 'node-fetch';

export async function HttpGet(url,headers?:{},objectResponse=false) {
    return await HttpCustom("get",url,undefined,headers,objectResponse);
}

export async function HttpPost(url,data:string|object,headers?:{},objectResponse=false){
    return await HttpCustom("post",url,data,headers,objectResponse);
}

export async function HttpCustom(method,url,body?:string|object,headers?:{},objectResponse=false) {
    if(typeof body == "object"){
        body = JSON.stringify(body);
        if(!headers) headers={}
        headers["Content-Type"] = "application/json";
        return await HttpCustom(method,url,body,headers,objectResponse);
    }
    let req = {
        method: method,
        headers: headers,
    }
    if(body)req["body"] = body;
    let res = await fetch(url,req);

    if(objectResponse){
        return await res;
    }
    return await res.text();
}


