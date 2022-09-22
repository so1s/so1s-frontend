const { hostname } = window.location;

const getBackendUrl = () => {
    if (hostname.startsWith('localhost') || hostname.startsWith('127.0.0.1')) {
        return 'http://localhost:8080';
    }

    return 'https://www.so1s.io';
};

export const baseURL = getBackendUrl();
