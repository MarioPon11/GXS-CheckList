// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer, shell } from 'electron';
type ElectronData = string | number | boolean | object | null | any | undefined;

contextBridge.exposeInMainWorld(
    "api", {
    send: (channel: string, data: ElectronData) => {
        const validChannels = ['toMain'];
        console.log('Messaged sent on chanel:', channel);
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    },
    receive: (channel: string, func: ElectronData) => {
        const validChannels = ['fromMain'];
        console.log('Messaged received on chanel:', channel, func);
        if (validChannels.includes(channel)) {
            // Deliberately strip event as it includes `sender`
            ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
    },
    invoke: async (channel: string, data: ElectronData) => {
        const validChannels = ["cahnnel-name"];
        if (validChannels.includes(channel)) {
            return await ipcRenderer.invoke(channel, data);
        }
    }
});

contextBridge.exposeInMainWorld('electron', {
    shell: {
        openExternal: (url: string) => {
            shell.openExternal(url);
        },
    },
});