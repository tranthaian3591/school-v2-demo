import { LocalStorageUtil } from './localstorage';

export class ScriptUtil {
    static bodyClass(strClass: string) {
        const body = document.body;
        body.classList.add(strClass);
    }

    static loadScript(url: string) {
        const body = document.body as HTMLDivElement;
        const script = document.createElement('script');
        script.innerHTML = '';
        script.src = url;
        script.async = true;
        script.defer = true;
        body.appendChild(script);
    }

    static setScrollTop(animation?: boolean) {
        const scrollToTop = window.setInterval(() => {
            const pos = window.pageYOffset;
            if (pos > 0) {
                window.scrollTo(0, animation ? pos - 20 : 0);
            } else {
                window.clearInterval(scrollToTop);
            }
        }, 0);
    }

    static onToggleSidebar(isOpened: boolean) {
        LocalStorageUtil.setStateSidebar(isOpened);
        if (isOpened) {
            document.body.classList.add('m-brand--minimize', 'm-aside-left--minimize');
        } else {
            document.body.classList.remove('m-brand--minimize', 'm-aside-left--minimize');
        }
    }

    static appendBadgeToSidebar(soLuong: number, type: string) {
        const htmlElements = document.getElementsByClassName(type);
        if (soLuong > 0 && htmlElements.length > 0) {
            // set notification
            setTimeout(() => {
                document.getElementsByClassName(type)[0].innerHTML = `<span class="m-badge m-badge--danger" > ${soLuong} </span>`;
            }, 100);
        } else {
            if (htmlElements.length > 0) {
                document.getElementsByClassName(type)[0].innerHTML = '';
            }
        }
    }
}
