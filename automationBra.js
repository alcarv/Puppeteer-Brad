const puppeteer = require('puppeteer');



(async () => {
   // Starting browser
   const browser = await puppeteer.launch({
        headless: false,
       executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
       args: ['--no-sandbox', '--enable-features=NetworkService', '--ignore-certificate-errors', '--disable-web-security']});
   const page = await browser.newPage(); 
   //let pages = await browser.pages();
   await page.goto('http://bradescoconsorcios.com.br/html/scripts/LoginCotasInativas.htm');


   //const numeros = [];
   //const numberRand =  Math.floor(Math.random() * 1000 + 1)
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
        //await page.type('input[id="txtGrupo"]', '1234');
        //await page.waitFor(1000)
        await page.type('input[id="txtCota"]', indice);
        //await page.waitFor(1000)
        //await page.type('input[id="txtGrupo"]', '');
        await page.click('img[onclick="ValidarForm();"]'); 
        const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));
        //await page.click('my-link');
        // handle Page 2: you can access new page DOM through newPage object
        const newPage = await newPagePromise;
        await newPage.setRequestInterception(true);
        page.on('request', request => {
            if (request.url() === 'http://bradescoconsorcios.com.br/scripts/websiac1.exe/ultimaassembleiainativoidentificacao')
              request.abort();
            else
              request.continue();
          });
        //await newPage.waitForSelector('#appid');
        //const appidHandle = await page.$('#appid');
        //const appID = await page.evaluate(element=> element.innerHTML, appidHandle );
        //await newPage.close()
        console.log(newPage);
        //await page.goto('http://bradescoconsorcios.com.br/html/scripts/LoginCotasInativas.htm');
        await page.evaluate( () => document.getElementById("txtCota").value = "");
        console.log(indice);
        /*await pages[0].waitForFunction(() => {
            pages[0].click('input[onclick="window.close();"]');
        });*/
    };

    //const newWindowTarget = await browser.waitForTarget(target => target.url() === 'https://www.example.com/');
    
    /*browser.on('targetcreated',async function () {
        console.log('attaching pre-filter');
        const pageList = await browser.pages();
        const page = pageList[pageList.length - 1];
        await page.setRequestInterception(true); //make sure it won't load extra stuff
        page.on('request',blockLoading);
        });
    }*/


})();