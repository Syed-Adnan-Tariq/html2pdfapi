import puppeteer from 'puppeteer'

export async function htmlToPdf(htmlString): Promise<Buffer> {
    const chromiumBrowser = await puppeteer.launch({
      headless: 'new',
      executablePath: process.env.CHROMIUM_PATH,
      args: ['--headless', '--disable-gpu', '--no-sandbox', '--single-process',  '--disable-web-security', '--no-zygote']
    })
    const chromiumpage = await chromiumBrowser.newPage()
    await chromiumpage.setContent(htmlString)
    await chromiumpage.emulateMediaType('screen');
    const pdf = await chromiumpage.pdf({
      margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
      printBackground: true,
      format: 'A4',
    });

    await chromiumBrowser.close()
    return pdf
  }