export const baseURL = `${
    import.meta.env.VITE_API_URL ?? globalThis?.location
        ? `${globalThis?.location.protocol}//${globalThis?.location.hostname}`
        : ''
}`;

export const removeSubdomain = (domain: string): string => {
    // https://stackoverflow.com/a/10526727/11853111
    const subdomainRegex = /(?<=http[s]*:\/\/)(.*?\.)*(?=[^/]*\..{2,5})/i;

    return domain.replace(subdomainRegex, '');
};

export const domain = removeSubdomain(baseURL);

export enum UNIT {
    LATENCY = 'ms',
    GPU = '%',
    REPLICAS = '',
}

export const { locale } = new Intl.NumberFormat().resolvedOptions();
