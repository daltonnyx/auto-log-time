import IdentityService from './services/identity.service';
import moment from 'moment';
import LogtimeService from './services/logtime.service';
import config from './config.json';

moment.updateLocale("en", {
  week: {
    dow: 1, // First day of week is Monday
  }
});

const logtime = new LogtimeService();

IdentityService.execute().then(async (token) => {
  const start_date = moment().startOf('week').format("YYYY-MM-DD");
  const end_date = moment().endOf('week').format("YYYY-MM-DD");
  const invalid_date = parseInt(await logtime.count_invalid_date(token, start_date, end_date));
  console.log(`You have ${invalid_date} invalid date(s)`);
  if (invalid_date > 0) {
    let invalid = await logtime.get_invalid_date(token, start_date, end_date);
    for (let i = 0; i < invalid.length; i++) {
      const log = invalid[i];
      console.log("logging date", log.logDate);
      for(let project of config.projectSettings) {
        await logtime.log_time(token, log.logDate, project.projectId, project.hours, project.hourRate);
      }
      
    }
  }
  let currentDate = moment().format("YYYY-MM-DD");
  for(let project of config.projectSettings) {
    await logtime.log_time(token, currentDate, project.projectId, project.hours, project.hourRate);
  }
  process.exit(1);
}, err => {
  console.log(err);
});