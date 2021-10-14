export declare function HttpGet(url: any, headers?: {}, objectResponse?: boolean): Promise<any>;
export declare function HttpPost(url: any, data: string | object, headers?: {}, objectResponse?: boolean): Promise<any>;
export declare function HttpCustom(method: any, url: any, body?: string | object, headers?: {}, objectResponse?: boolean): any;
