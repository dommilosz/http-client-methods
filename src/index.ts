import fetch, {Response} from 'node-fetch';

export async function HttpGet(url: string, headers: {}, objectResponse: true): Promise<Response>
export async function HttpGet(url: string, headers: {}, objectResponse: false): Promise<string>
export async function HttpGet(url: string, headers: {}, objectResponse: boolean): Promise<string | Response>
export async function HttpGet(url: string, headers?: {}): Promise<string>
export async function HttpGet(url: string, headers?: {}, objectResponse = false) {
    return await HttpCustom("get", url, undefined, headers, objectResponse);
}

export async function HttpGetJson(url, headers?: {}): Promise<object> {
    return await HttpCustomJson("get", url, undefined, headers);
}

export async function HttpPost(url: string, data, headers: {}, objectResponse: true): Promise<Response>
export async function HttpPost(url: string, data, headers: {}, objectResponse: false): Promise<string>
export async function HttpPost(url: string, data, headers: {}, objectResponse: boolean): Promise<string | Response>
export async function HttpPost(url: string, data, headers?: {}): Promise<string>

export async function HttpPost(url: string, data: string | object, headers?: {}, objectResponse = false) {
    return await HttpCustom("post", url, data, headers, objectResponse);
}

export async function HttpPostJson(url: string, data: string | object, headers?: {}): Promise<object> {
    return await HttpCustomJson("post", url, data, headers);
}

export async function HttpCustom(method: string, url: string, body, headers: {}, objectResponse: true): Promise<Response>
export async function HttpCustom(method: string, url: string, body, headers: {}, objectResponse: boolean): Promise<Response | string>
export async function HttpCustom(method: string, url: string, body, headers: {}, objectResponse: false): Promise<string>
export async function HttpCustom(method: string, url: string, body, headers?: {}): Promise<string>
export async function HttpCustom(method: string, url: string, body?: string | object, headers?: {}, objectResponse = false) {
    if (typeof body == "object") {
        body = JSON.stringify(body);
        if (!headers) headers = {}
        headers["Content-Type"] = "application/json";
        return await HttpCustom(method, url, body, headers, objectResponse);
    }
    let req = {
        method: method,
        headers: headers,
    }
    if (body) req["body"] = body;
    let res = await fetch(url, req);

    if (objectResponse) {
        return res;
    }
    return await res.text();
}

export async function HttpCustomJson(method: string, url: string, body?: string | object, headers?: {}) {
    return JSON.parse(await HttpCustom(method,url,body,headers,false))
}