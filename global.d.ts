interface Window {
    api: {
        send: (channel: string, ...data?: any) => void;
        receive: (channel: string, func?: (event: any, ...args: any[]) => void) => void|Promise<any>|string;
        invoke: (channel: string, ...data?: any) => Promise<any>|string|number|boolean|object|null|any|undefined;
    };
}
