const puppeteer = require('puppeteer');



(async () => {
   // Starting browser
   const browser = await puppeteer.launch({
        headless: false,
       executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
       args: ['--no-sandbox', '--enable-features=NetworkService', '--ignore-certificate-errors', '--disable-web-security']});
   const page = await browser.newPage(); 
   await page.goto('http://bradescoconsorcios.com.br/html/scripts/LoginCotasInativas.htm');

   page.setDefaultTimeout(0);
   await page.waitForFunction(() => {
    const group = document.getElementById('txtGrupo').value;
    const txtCpfCnpj = document.getElementById('txtCpfCnpj').value;
        if(txtCpfCnpj.length > 10 && group.length < 5) {
            return txtCpfCnpj && group;
        };
      
    });

     for (let index = 1; index < 1000; index++) {
          let indice = ("00" + index).slice(-3);
        await page.type('input[id="txtCota"]', indice);
        await page.click('img[onclick="ValidarForm();"]'); 
        const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));
        const newPage = await newPagePromise;
        await newPage.close()
        await page.evaluate( () => document.getElementById("txtCota").value = "");
    };


})();