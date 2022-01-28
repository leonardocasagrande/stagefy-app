import moment from 'moment';

class DateUtils {
  static convertDateToShow = (date: string) => {
    return moment(new Date(date)).format('DD/MM/YYYY');
  };

  static convertTimeToShow = (date: string) => {
    return moment(new Date(date)).format('HH:mm');
  };
}

export default DateUtils;
