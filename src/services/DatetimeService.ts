import * as moment from "moment";

export default class DatetimeService {

    getUtcNow(): moment.Moment {
        return moment.utc();
    }

}