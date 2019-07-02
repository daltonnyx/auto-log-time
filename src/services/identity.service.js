import puppeteer from 'puppeteer';
import config from '../config.json';

export default class IdentityService {
  static execute() {
    return new Promise(async (resolve, reject) => {
      try {
        const browser = await puppeteer.launch({
          headless: true
        });
        const page = await browser.newPage();
        await page.goto('http://insider.saigontechnology.vn');
        await page.on("response", async (response) => {

          if (response.status() >= 300 && response.status() <= 399) {
            const redirect_uri = response.headers()['location'];
            if (redirect_uri.indexOf("identity.saigontechnology.vn") != -1) {
              await page.waitFor(1000);
              console.log("went to evaluate");
              await page.focus("#Username");
              await page.keyboard.type(config.credential.username);
              await page.focus("#Password");
              await page.keyboard.type(config.credential.password);
              await page.click('button[value="login"]');
              page.on("request", async (request) => {
                if (request.headers()['authorization']) {
                  const token = request.headers()['authorization'];
                  await page.close();
                  await browser.close();
                  resolve(token);
                }
              });
            }
          }
        });
      } catch (ex) {
        reject(ex)
      }

      //await browser.close();
    });
  }
}