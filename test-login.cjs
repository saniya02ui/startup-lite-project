const puppeteer = require('puppeteer');

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Intercept and print console logs
  page.on('console', msg => {
    const text = msg.text();
    console.log('[BROWSER CONSOLE]', text);
  });
  
  page.on('pageerror', err => {
    console.log('[BROWSER ERROR]', err.message);
  });

  page.on('requestfailed', request => {
    console.log(`[REQUEST FAILED] ${request.url()} - ${request.failure().errorText}`);
  });

  page.on('response', async (response) => {
    if (response.url().includes('/api/auth/')) {
      console.log(`[API RESPONSE] ${response.url()} - ${response.status()}`);
      try {
        console.log(`[API BODY] ${await response.text()}`);
      } catch (e) {}
    }
  });

  try {
    console.log('Navigating to http://localhost:5173/login...');
    await page.goto('http://localhost:5173/login', { waitUntil: 'networkidle0' });
    
    console.log('Typing credentials...');
    await page.type('input[name="email"]', 'test123456@example.com');
    await page.type('input[name="password"]', 'password123');
    
    console.log('Clicking login...');
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 5000 }).catch(e => console.log('Navigation timeout or no navigation occurred.')),
      page.click('button[type="submit"]')
    ]);
    
    console.log('After login, checking URL:', page.url());
    
    // Wait a bit to see if there are redirects
    await new Promise(r => setTimeout(r, 2000));
    console.log('Final URL after 2 seconds:', page.url());
    
  } catch (err) {
    console.error('Test error:', err);
  } finally {
    await browser.close();
  }
})();
