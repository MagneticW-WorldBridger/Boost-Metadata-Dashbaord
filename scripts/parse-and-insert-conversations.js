const fs = require('fs');
const { Client } = require('pg');

// Database connection
const client = new Client({
  connectionString: 'postgres://neondb_owner:npg_ltLop8Tiz7vU@ep-misty-shape-adgi2svs-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require'
});

async function parseAndInsertConversations() {
  try {
    // Read the markdown file
    const markdownContent = fs.readFileSync('HOOKERCONVOS.MD', 'utf8');
    
    // Connect to database
    await client.connect();
    console.log('Connected to database');

    // Split by conversation markers (---)
    const conversationSections = markdownContent.split(/\n---\n/);
    console.log(`Found ${conversationSections.length} conversation sections`);

    // Get dealer IDs for mapping
    const dealerResult = await client.query('SELECT id, name FROM dealers');
    const dealerMap = {};
    dealerResult.rows.forEach(dealer => {
      dealerMap[dealer.name] = dealer.id;
    });

    let insertedCount = 0;
    
    for (const section of conversationSections) {
      // Skip if not a conversation section
      if (!section.includes('Conversation ')) continue;
      
      // Extract conversation number and type
      const headerMatch = section.match(/Conversation (\d+) \((.+?)\)/);
      if (!headerMatch) continue;
      
      const conversationNumber = parseInt(headerMatch[1]);
      const dealerType = headerMatch[2].trim();
      
      // Extract all User: and Assistant: messages
      const userMessages = [];
      const assistantMessages = [];
      
      const lines = section.split('\n');
      for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith('User:')) {
          userMessages.push(trimmedLine.replace('User:', '').trim());
        } else if (trimmedLine.startsWith('Assistant:')) {
          assistantMessages.push(trimmedLine.replace('Assistant:', '').trim());
        }
      }
      
      if (userMessages.length === 0 || assistantMessages.length === 0) continue;
      
      // Combine into full conversation
      const conversationParts = [];
      const maxLength = Math.max(userMessages.length, assistantMessages.length);
      for (let k = 0; k < maxLength; k++) {
        if (userMessages[k]) {
          conversationParts.push(`User: ${userMessages[k]}`);
        }
        if (assistantMessages[k]) {
          conversationParts.push(`Assistant: ${assistantMessages[k]}`);
        }
      }
      
      const fullConversation = conversationParts.join('\n');
      
      // Extract dealer name from first user message
      const firstUserMessage = userMessages[0] || '';
      let dealerName = '';
      let dealerId = null;
      
      // Extract dealer name from patterns like "DécorPoint here—", "UrbanLoft—", etc.
      const dealerMatch = firstUserMessage.match(/^([A-Za-zÀ-ÿ]+(?:[A-Za-zÀ-ÿ]*))[—\-]/);
      if (dealerMatch) {
        dealerName = dealerMatch[1];
        dealerId = dealerMap[dealerName] || null;
      }

      // Extract SKU interest
      let skuInterest = null;
      const skuMatch = fullConversation.match(/HF-\d+/);
      if (skuMatch) {
        skuInterest = skuMatch[0];
      }

      // Determine conversation type
      const isWarrantyClaim = /warranty|claim|tear|damage|defect/i.test(fullConversation);
      const isCustomOrder = /custom|dimension|size|special/i.test(fullConversation);
      
      // Determine sales intent
      let salesIntent = 'inquiry';
      if (isWarrantyClaim) salesIntent = 'warranty';
      else if (isCustomOrder) salesIntent = 'custom_order';
      else if (/order|buy|purchase/i.test(fullConversation)) salesIntent = 'purchase';
      else if (/quote|pricing/i.test(fullConversation)) salesIntent = 'quote';

      // Determine dealer type
      let dealerTypeEnum = 'reseller';
      if (dealerType.includes('Designer')) dealerTypeEnum = 'designer';
      else if (dealerType.includes('Consumer')) dealerTypeEnum = 'consumer';

      // Calculate satisfaction score
      let satisfactionScore = 0.85; // Default good score
      if (/thank|perfect|excellent|great/i.test(fullConversation)) satisfactionScore = 0.95;
      if (/frustrated|angry|not happy/i.test(fullConversation)) satisfactionScore = 0.60;

      // Insert conversation
      const insertQuery = `
        INSERT INTO chat_conversations 
        (dealer_id, conversation_text, sku_interest, dealer_type, sales_intent, 
         warranty_claim, custom_order, resolved, satisfaction_score)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `;

      await client.query(insertQuery, [
        dealerId,
        fullConversation,
        skuInterest,
        dealerTypeEnum,
        salesIntent,
        isWarrantyClaim,
        isCustomOrder,
        true, // Most conversations are resolved
        satisfactionScore
      ]);

      insertedCount++;
      console.log(`Inserted conversation ${conversationNumber}: ${dealerName} (${dealerType})`);
    }

    console.log(`\n✅ Successfully inserted ${insertedCount} conversations into database`);
    
    // Verify insertion
    const countResult = await client.query('SELECT COUNT(*) FROM chat_conversations');
    console.log(`Total conversations in database: ${countResult.rows[0].count}`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.end();
  }
}

parseAndInsertConversations(); 