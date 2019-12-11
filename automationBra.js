const puppeteer = require('puppeteer');
const fs = require('fs');



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
        const valueCota = await page.$("#txtCota");
        const pegarCota = await (await valueCota.getProperty('value')).jsonValue();
        const valueCpf = await page.$("#txtCpfCnpj");
        const pegarCpf = await (await valueCpf.getProperty('value')).jsonValue();
        await page.click('img[onclick="ValidarForm();"]'); 
        //console.log(page);
        await page.setRequestInterception(true);
        page.on('request', request => {
            if (request.url() == 'http://bradescoconsorcios.com.br/html/content/restrito/images/canal/txt_resultadodasassembleias.gif'){
                console.log('TA PASSANDO AQUI OOOOOG')
                fs.writeFile(`/Users/alefe/Documents/${pegarCpf}.txt`, pegarCota, (err) => {
                    if (err) throw err;
                   // process.exit();
                });
            } else
              request.continue();
          });
        const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));
        const newPage = await newPagePromise;
        await newPage.setRequestInterception(true);
        //console.log(newPage);
        await newPage.close()
        await page.evaluate( () => document.getElementById("txtCota").value = "");
    };


})();