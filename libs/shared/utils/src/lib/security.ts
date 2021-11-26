import * as CryptoJS from 'crypto-js';

const keyEncode = 'Zq4t7w!z%C*F-JaNcRfUjXn2r5u8x/A?D(G+KbPeSgVkYp3s6v9y$B&E)H@McQfT';
export class SecurityUtil {
    static set(text: string) {
        try {
            return CryptoJS.AES.encrypt(
                CryptoJS.enc.Utf8.parse(text.toString()),
                keyEncode
            ).toString();
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    /**
     * Decrypts key
     * @param text
     * @returns
     */
    static get(text: string) {
        try {
            return CryptoJS.AES.decrypt(text, keyEncode).toString(CryptoJS.enc.Utf8);
        } catch (e) {
            return null;
        }
    }

    static generateGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = (Math.random() * 16) | 0;
            const v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }
}
