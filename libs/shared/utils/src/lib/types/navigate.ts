import { SafeAny } from './safe';

export function navigateToExternalLink(url: string, params?: SafeAny) {
    if (params) {
        url = `${url}?` + Object.keys(params)
            .map((key) => `${key}=${params[key]}`)
            .join('&');
    }
    window.location.href = url;
}
