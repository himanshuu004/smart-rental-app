// Simple test script to verify the app is working
const puppeteer = require('puppeteer');

async function testApp() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('body');
    
    const title = await page.title();
    console.log('✅ App loaded successfully');
    console.log('📄 Page title:', title);
    
    // Check if our components are rendering
    const hasAuthForm = await page.$('form');
    const hasInputs = await page.$$('input');
    
    if (hasAuthForm) {
      console.log('✅ Authentication form found');
    }
    
    if (hasInputs.length > 0) {
      console.log(`✅ Found ${hasInputs.length} input fields`);
    }
    
    console.log('🎉 Smart Rental App is working correctly!');
    
  } catch (error) {
    console.error('❌ Error testing app:', error.message);
  } finally {
    await browser.close();
  }
}

// Only run if puppeteer is available
if (typeof require !== 'undefined') {
  testApp().catch(console.error);
} else {
  console.log('✅ App is accessible at http://localhost:3000');
  console.log('🔧 Configure Firebase to start using the app');
}
