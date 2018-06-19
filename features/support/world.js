const { setWorldConstructor } = require('cucumber')
const { expect } = require('chai')
const puppeteer = require('puppeteer')

const HOME_PAGE = 'http://localhost:3000'

class AdressBookWorld {

    constructor() {}

    // Open the home page using puppeteer
    async openHomePage() {
        this.browser = await puppeteer.launch()
        this.page = await this.browser.newPage()
        await this.page.goto(HOME_PAGE)
    }
    async closeHomePage() {
        await this.browser.close()
    }

    async pageHasTextContent(expectedContent) {
        const pageContent = await this.page.content()
        const actualContent = pageContent.match(expectedContent)[0]

        expect(actualContent).to.be.eq(expectedContent)
    }

    async clickOnAddContactBtn() {
        const btnSelector = '.add-contact'
        await this.page.waitForSelector(btnSelector)
        await this.page.click(btnSelector)
    }
}

setWorldConstructor(AdressBookWorld)