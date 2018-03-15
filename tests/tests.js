module.exports = {
    beforeEach : browser => {
        browser.url('https://devmountain-qa.github.io/enter-wanted/1.4_Assignment/index.html')
            .waitForElementPresent('body', 1000)
    },
    after : browser => {
        browser.end()
    },
    'Valid Inputs' : browser => {
        browser.setValue('input[name="hdrInput"]', '123456789')
            .setValue('input[name="mkeInput"]', 'MKE')
            .setValue('input[name="oriInput"]', '123456789')
            .setValue('input[name="namInput"]', 'Dan Jin')
            .setValue('input[name="sexInput"]', 'M')
            .setValue('input[name="racInput"]', 'A')
            .setValue('input[name="hgtInput"]', '601')
            .setValue('input[name="wgtInput"]', '180')
            .setValue('input[name="haiInput"]', 'Black')
            .setValue('input[name="offInput"]', 'Speeding')
            .setValue('input[name="dowInput"]', '03032018')
            .click('#saveBtn')
        browser.assert.containsText('#validHeader', "Valid")
        browser.assert.containsText('span[name="queryTitle"]', "Assembled Query:")
        browser.assert.containsText('span[name="queryBody"]', "123456789.MKE.123456789.Dan Jin.M.A.601.180.Black.Speeding.03032018......")
    },
    'Licence Number with no DL State or DL Expiration' : browser => {
        browser.setValue('input[name="olnInput"]', 'J')
            .click('#saveBtn')
        browser.assert.containsText('#validHeader', "Errors Received:")
        browser.useXpath()
        browser.assert.containsText('//*[@id="errorList"]/li[12]', "If Operator's License Number, DL State, or DL Expiration Year are present, all three must be present.")
        browser.useCss()
        browser.assert.containsText('span[name="queryTitle"]', "No results generated due to error.")
    }
}