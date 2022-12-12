export const baseURL = `${import.meta.env.VITE_API_URL ?? ''}`;

export enum UNIT {
    LATENCY = 'ms',
    GPU = '%',
    REPLICAS = '',
}

export const { locale } = new Intl.NumberFormat().resolvedOptions();
