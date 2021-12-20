export interface ILoadable<T> {
    message: string;
    status: LoadableStatus;
    value: T | null;
}

export enum LoadableStatus {
    Loading = 'Loading',
    Loaded = 'Loaded',
    Error = 'Error'
}
