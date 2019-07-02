import http from 'http';
import config from '../config.json';
import moment from 'moment';
import Activity from '../models/activity.model';

export default class LogtimeService {
  count_invalid_date(token, start_date, end_date) {
    return new Promise((resolve, reject) => {
      try {
        http.get({
          hostname: "insiderapi.saigontechnology.vn",
          path: `/api/timesheet/${config.credential.username}/totalInvalidTimesheet/${start_date}/${end_date}`,
          headers: {
            Authorization: token
          }
        }, (res) => {
          let body = '';
          res.on('data', chunk => {
            body += chunk
          });
          res.on('end', () => {
            resolve(body)
          });
        });
      } catch (ex) {
        reject(ex)
      }
    });
  }

  get_invalid_date(token, start_date, end_date) {
    return new Promise((resolve, reject) => {
      try {
        http.get({
          hostname: "insiderapi.saigontechnology.vn",
          path: `/api/timesheet/${config.credential.username}/timesheetCalendar/${start_date}/${end_date}`,
          headers: {
            Authorization: token
          }
        }, (res) => {
          let body = '';
          res.on('data', chunk => {
            body += chunk
          });
          res.on('end', () => {
            const list_date = JSON.parse(body);
            resolve(list_date.filter(c => !c.isValid));
          });
        });
      } catch (ex) {
        reject(ex)
      }
    });
  }

  log_time(token, date, projectId, hours, hourRate) {
    return new Promise((resolve, reject) => {
      hours = hours || 8;
      hourRate = hourRate || 1;
      const data = JSON.stringify({
        activity: Activity.code,
        comment: "",
        hourRate: hourRate,
        hours: hours,
        logDate: moment(date).format("YYYY-MM-DD"),
        projectId: projectId,
        userId: 1,
      });
      const request = http.request({
        hostname: "insiderapi.saigontechnology.vn",
        method: 'POST',
        path: '/api/timesheet/add',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
          'Content-Length': data.length
        }
      }, res => {
        console.log(res.statusCode);
        if (res.statusCode == "200") {
          console.log("logged date", date);
          resolve(true);
        }
      });
      request.write(data);
    });

  }
}