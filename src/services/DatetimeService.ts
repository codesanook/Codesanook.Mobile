import * as moment from 'moment';
import 'moment-timezone';

export default class DateTimeService {

    getUtcNow(): moment.Moment {
        return moment.utc();
    }

    getAllTimezoneNames(): string[] {
        return moment.tz.names();
    }

    getDateOfBirth(): moment.Moment {
        //.NET date time
        // https://www.newtonsoft.com/json/help/html/SerializeDateTimeZoneHandling.htm
        let serverTimezone = 'Asia/Bangkok'
        //let serverTimezone = 'Australia/Sydney'
        moment.tz.setDefault(serverTimezone);
        //If a time part is included, an offset from UTC can also be included as +-HH:mm, +-HHmm, +-HH or Z.

        let dateOfBirth = moment.tz('2013-01-01 00:00', serverTimezone);
        return dateOfBirth;
    }

    getTimezoneOffset(): Number {
        let serverTimezone = 'Australia/Sydney'
        return moment.tz(moment.utc(), serverTimezone).utcOffset()
    }
}
