const utils = {}
utils.install = function (Vue) {
    Vue.prototype.$utils = {
        routeMatch(currentRoute, tomatch) {
            console.log('route match util jonge');
        },
        getMonthAsString(currentMonth) {
            const monthList = [
                'januari',
                'februari',
                'maart',
                'april',
                'mei',
                'juni',
                'juli',
                'augustus',
                'september',
                'oktober',
                'november',
                'december',
            ];

            return monthList[currentMonth];
        },
        getPrettyDateTime(dateString) {
            const date = new Date(dateString);
            return `${this.getPrettyDate(dateString)} ${date.getUTCHours()}:${date.getUTCSeconds()}`;
        },
        getPrettyDate(dateString) {
            const date = new Date(dateString);
            return `${date.getUTCDate()} ${this.getMonthAsString(date.getUTCMonth())} ${date.getFullYear()}`;
        },
        getPrettyPhoneNumber(phoneNumber) {
            if (phoneNumber === undefined) return "";
            return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 4)} ${phoneNumber.slice(4, 6)} ${phoneNumber.slice(6, 8)} ${phoneNumber.slice(8, 10)} ${phoneNumber.slice(10, 12)}`;
        },
    };
};

export default utils;
