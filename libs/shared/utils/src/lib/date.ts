import { SafeAny } from './types';

export class DateUtil {
    /**
     * Get Now
     */
    static getNow(): string {
        return new Date().toISOString();
    }

    /**
     * Get FullDate
     * @param newDate
     */
    static getFullDate(newDate: SafeAny) {
        if (!newDate) {
            return;
        }

        const today = new Date(newDate);
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        const yyyy = today.getFullYear();
        return `${yyyy}-${mm}-${dd}`;
    }

    /**
     *
     * @param newDate
     */
    static viewFullDate(newDate: string) {
        if (!newDate) {
            return;
        }

        const today = new Date(newDate);
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        const yyyy = today.getFullYear();
        return `${dd}/${mm}/${yyyy}`;
    }

    /**
     * Get Full DateTime
     * @param newDate
     */
    static getFullDateTime(newDate: SafeAny) {
        if (!newDate) {
            return null;
        }

        const today = new Date(newDate);
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        const hh = String(today.getHours()).padStart(2, '0');
        const ss = String(today.getMinutes()).padStart(2, '0');
        const yyyy = today.getFullYear();
        return `${yyyy}-${mm}-${dd}T${hh}:${ss}`;
    }

    /**
     * Convert Month/Year -> DateTime
     * @param month
     * @param year
     */
    static convertMonthYearToDateTime(month: number, year: number) {
        const date = new Date();
        date.setMonth(month);
        date.setFullYear(year);
        return date;
    }

    /**
     * Check ngay ket thuc > ngay bat dau
     * @param dateFrom
     * @param dateTo
     */
    static checkDateFromDateTo(dateFrom: SafeAny, dateTo: SafeAny) {
        const from = this.convertDateTimeToUTC(dateFrom);
        const to = this.convertDateTimeToUTC(dateTo);
        return to >= from;

    }

    /**
     *
     * @param newDate
     */
    static convertDateTimeToUTC(newDate: SafeAny) {
        const updateDateUTC = new Date(newDate);
        updateDateUTC.setHours(0, 0, 0, 0);
        return updateDateUTC;
    }

    /**
     * Add year to datetime
     * @param value
     * @param yearNumber
     */
    static addYearToDate(value: SafeAny, yearNumber: number) {
        const date = new Date(value);
        date.setFullYear(date.getFullYear() + yearNumber);
        return date;
    }

    /**
     * Add month to date
     * @param value
     * @param monthNumber
     */
    static addMonthToDate(value: SafeAny, monthNumber: number) {
        const date = new Date(value);
        date.setMonth(date.getMonth() + monthNumber);
        return date;
    }

    /**
     * Minus month from date
     * @param value
     * @param monthNumber
     */
    static minusMonthToDate(value: SafeAny, monthNumber: number) {
        const date = new Date(value);
        date.setMonth(date.getMonth() - monthNumber);
        return date;
    }

    static compareToDate(object1: SafeAny, object2: SafeAny) {
        if (!object1 || !object2) return null;
        const date1 = DateUtil.getFullDate(object1);
        const date2 = DateUtil.getFullDate(object2);
        return new Date(date1 as SafeAny).getTime() - new Date(date2 as SafeAny).getTime();
    }
}
