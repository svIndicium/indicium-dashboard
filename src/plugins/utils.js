const utils = {}
utils.install = function (Vue) {
    Vue.prototype.$utils = {
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
        getDayAsString(currentDay = new Date().getDay()) {
            const week = [
                'Zondag',
                'Maandag',
                'Dinsdag',
                'Woensdag',
                'Donderdag',
                'Vrijdag',
                'Zaterdag'
            ]

            return week[currentDay]
        },
        getPrettyDateTime(dateString) {
            const date = new Date(dateString);
            return `${this.getPrettyDate(dateString)} ${date.getUTCHours()}:${date.getUTCMinutes()}`;
        },
        getPrettyDate(dateString) {
            const date = new Date(dateString);
            return `${date.getUTCDate()} ${this.getMonthAsString(date.getUTCMonth())} ${date.getFullYear()}`;
        },
        getPrettyPhoneNumber(phoneNumber) {
            if (phoneNumber === undefined) return "";
            return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 4)} ${phoneNumber.slice(4, 6)} ${phoneNumber.slice(6, 8)} ${phoneNumber.slice(8, 10)} ${phoneNumber.slice(10, 12)}`;
        },
        getPrettyCurrency(amount) {
            return `€${amount.toFixed(2)}`;
        },
        getFullName(name) {
            if (name.middleName) {
                return `${name.firstName} ${name.middleName} ${name.lastName}`;
            }
            return `${name.firstName} ${name.lastName}`;
        },
        getFullLastName(name) {
            if (name.middleName) {
                return `${name.middleName} ${name.lastName}`;
            }
            return `${name.lastName}`;
        },
        getAge(dateOfBirth) {
            const ageDifMs = Date.now() - dateOfBirth.getTime();
            const ageDate = new Date(ageDifMs);
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        },
        getWhatsappLink(phoneNumber) {
            if (phoneNumber === undefined) return "";
            return `https://wa.me/${phoneNumber.replace("+", "")}`;
        },
        getMailLink(mailAddress) {
            return `mailto:${mailAddress}`;
        }
    };
};

export default utils;
