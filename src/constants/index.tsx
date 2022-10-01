const { hostname } = window.location;

const getBackendUrl = () => {
    if (hostname.startsWith('localhost') || hostname.startsWith('127.0.0.1')) {
        return 'http://localhost:8080';
    }

    if (hostname.includes('so1s')) {
        return 'https://www.so1s.io';
    }

    return `http://${hostname}:8080`;
};

export const baseURL = getBackendUrl();
