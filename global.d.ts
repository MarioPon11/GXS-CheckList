interface Window {
    api: {
        send: (channel: string, ...data?: any) => void;
        receive: (channel: string, func?: (event: any, ...args: any[]) => void) => void | Promise<any> | string;
        invoke: (channel: string, ...data?: any) => Promise<any> | string | number | boolean | object | null | any | undefined;
    };
}

interface stageTitlesTypes {
    Checking: string;
    Found: string;
    NotFound: string;
    Downloading: string;
    Unzipping: string;
    Cleaning: string;
    Launch: string;
}

interface UpdateSettingsTypes {
    useGithub?: boolean;
    gitRepo: string;
    gitUsername: string;
    isGitRepoPrivate?: boolean;
    gitRepoToken?: string;

    appName: string;
    appExecutableName: string;

    appDirectory?: string;
    versionFile?: string;
    tempDirectory?: string;

    progressBar?: HTMLElement | null;
    label?: HTMLElement | null;
    forceUpdate?: boolean;
    stageTitles?: stageTitlesTypes;
}

declare module 'uaup-js' {
    export const Update: (UpdateSettings: UpdateSettingsTypes) => Promise<any>;
    export const CheckForUpdates: () => Promise<any>;
}
