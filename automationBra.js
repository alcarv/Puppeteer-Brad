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
        if (group.length > 3 && group.length < 5) {
            return group;
        };

    });
    loopCore();
    async function loopCore(){
        for (let index = 1; index < 1000; index++) {
            let indice = ("00" + index).slice(-3);
            await page.waitFor(500);
            await page.type('input[id="txtCota"]', indice);
            let valueCpf = await page.$("#txtCpfCnpj");
            let pegarCpf = await (await valueCpf.getProperty('value')).jsonValue();
            await page.click('img[onclick="ValidarForm();"]');
            await page.setRequestInterception(true);
            page.on('request', request => {
                if (request.url() == 'http://bradescoconsorcios.com.br/html/content/restrito/images/canal/txt_resultadodasassembleias.gif' || request.url() == 'http://bradescoconsorcios.com.br/html/images/rodape_IB.gif') {              
                    page.screenshot({path:`${pegarCpf}.png`});
                    request.abort();
                    page.goBack(5000);
                } else {
                request.continue();
                }
            });
           await page.waitForSelector('#txtCota')
           await page.waitFor(2000);
           await page.evaluate(() => document.getElementById("txtCota").value = "");

        };
    }; 
})();