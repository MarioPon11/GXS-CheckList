interface Window {
    api: {
        send: (channel: string, data: any) => void;
        receive: (channel: string, func: (event: any, ...args: any[]) => void) => void;
        invoke: (channel: string, data: any) => Promise<any>;
    };
}
