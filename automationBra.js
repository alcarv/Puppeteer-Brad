const puppeteer = require('puppeteer');

(async () => {
    const width = 500
    const height = 500
    // Starting browser
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
        args: [`--window-size=${width},${height}`]
    });
    const page = await browser.newPage();
    await page.goto('http://bradescoconsorcios.com.br/html/scripts/LoginCotasInativas.htm');

    page.setDefaultTimeout(0);
    await page.waitForFunction(() => {
        const group = document.getElementById('txtGrupo').value;
        const txtCpfCnpj = document.getElementById('txtCpfCnpj').value;
        if (txtCpfCnpj.length > 10 && group.length < 5) {
            return txtCpfCnpj && group;
        };

    });
    loopCore();
    async function loopCore(){
        for (let index = 1; index < 1000; index++) {
            let indice = ("00" + index).slice(-3);
            await page.waitFor(500);
            await page.type('input[id="txtCota"]', indice);
            console.log(indice);
            let valueCpf = await page.$("#txtCpfCnpj");
            let pegarCpf = await (await valueCpf.getProperty('value')).jsonValue();
            await page.click('img[onclick="ValidarForm();"]');
            await page.setRequestInterception(true);
            page.on('request', request => {
                if (request.url() == 'http://bradescoconsorcios.com.br/html/content/restrito/images/canal/txt_resultadodasassembleias.gif' || request.url() == 'http://bradescoconsorcios.com.br/html/images/rodape_IB.gif') {              
                    page.screenshot({path:`${pegarCpf}.png`});
                    request.abort();
                    page.goBack(5000);
                    //console.log('TA PASSANDO AQUI OOOOOG')
                } else {
                request.continue();
                }/*else
                    request.continue();
                    page.setRequestInterception(false);*/
            });
            //console.log(page);
           // await popup();
           await page.waitForSelector('#txtCota')
           await page.waitFor(2000);
           await page.evaluate(() => document.getElementById("txtCota").value = "");

        };
    }; 

   /* async function popup() {
          const targetPromise = new Promise(resolve => browser.once('targetcreated', resolve));
        const target = await targetPromise;
        //await newPage.setRequestInterception(true);
        //console.log(newPage);
        try{
            const newPage = await target.page();
            await newPage.close();
        }
        catch(e){
            console.log('Error: ' + e);
        }
        finally {
            //await page.evaluate(() => document.getElementById("txtCota").value = "");
            //console.log('AQUIIIIIIIIIIIIIIIIIii')
            await page.evaluate(() => document.getElementById("txtCota").value = "");
        }
    
    } */
})();