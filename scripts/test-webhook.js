const https = require('https');

async function testWebhook() {
  const webhookUrl = 'https://fotostesia.duckdns.org/webhook/f268f58e-eeb3-4fa2-ab9c-6d3ea738bd8d';
  
  const testQueries = [
    "What phones do you have available?",
    "I'm switching from Verizon, what can you offer?",
    "Do you have family plans?",
    "What's your cheapest iPhone?",
    "I need help with billing issues"
  ];

  console.log('🚀 Testing webhook with sample queries...\n');

  for (let i = 0; i < testQueries.length; i++) {
    const query = testQueries[i];
    console.log(`📝 Test ${i + 1}: "${query}"`);
    
    try {
      const response = await makePostRequest(webhookUrl, { query });
      console.log(`✅ Response: ${JSON.stringify(response, null, 2)}`);
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
    }
    
    console.log('─'.repeat(60));
    
    // Wait 2 seconds between requests to be polite
    if (i < testQueries.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
}

function makePostRequest(url, data) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data);
    
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonResponse = JSON.parse(responseData);
          resolve(jsonResponse);
        } catch (error) {
          resolve({ raw_response: responseData, status: res.statusCode });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

testWebhook(); 