const { Client } = require('pg');
const fs = require('fs');

async function parseAndInsertConversations() {
  const client = new Client({
    connectionString: "postgres://neondb_owner:npg_yefiD7Zl1WON@ep-delicate-shape-a4h9nxed-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require"
  });

  try {
    await client.connect();
    console.log('✅ Connected to database successfully!');

    // First, add the full_conversation column if it doesn't exist
    try {
      await client.query(`
        ALTER TABLE chat_metadata 
        ADD COLUMN IF NOT EXISTS full_conversation JSONB
      `);
      console.log('✅ Added full_conversation column');
    } catch (error) {
      console.log('ℹ️ Column might already exist:', error.message);
    }

    // Read the conversations file
    const conversationsText = fs.readFileSync('conversations.md', 'utf-8');
    console.log(`📖 Read conversations.md (${conversationsText.length} characters)`);

    // Parse conversations
    const conversations = parseConversations(conversationsText);
    console.log(`🔍 Found ${conversations.length} conversations to process`);

    // Insert each conversation
    let insertedCount = 0;
    for (const conversation of conversations) {
      try {
        const result = await client.query(`
          INSERT INTO chat_metadata (
            full_name, 
            last_text_input, 
            bot_reply, 
            last_seen, 
            customer_type, 
            sales_intent, 
            device_interest, 
            price_sensitivity, 
            competitor_mentioned, 
            family_plan_interest,
            full_conversation
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
          RETURNING id
        `, [
          conversation.full_name,
          conversation.last_text_input,
          conversation.bot_reply,
          conversation.last_seen,
          conversation.customer_type,
          conversation.sales_intent,
          conversation.device_interest,
          conversation.price_sensitivity,
          conversation.competitor_mentioned,
          conversation.family_plan_interest,
          JSON.stringify(conversation.full_conversation) // Store the full conversation as JSON
        ]);
        
        insertedCount++;
        console.log(`✅ Inserted conversation ${insertedCount}: ${conversation.full_name} (ID: ${result.rows[0].id})`);
      } catch (error) {
        console.error(`❌ Error inserting conversation ${conversation.full_name}:`, error.message);
      }
    }

    console.log(`\n🎉 Successfully inserted ${insertedCount} out of ${conversations.length} conversations!`);

    // Show final count
    const finalCount = await client.query('SELECT COUNT(*) FROM chat_metadata');
    console.log(`📊 Total records in database: ${finalCount.rows[0].count}`);

  } catch (error) {
    console.error('❌ Database error:', error.message);
  } finally {
    await client.end();
  }
}

function parseConversations(text) {
  const conversations = [];
  
  // Split by conversation markers
  const conversationSections = text.split(/Conversation \d+:|Bonus Conversation:|Follow-up:/);
  
  for (let i = 1; i < conversationSections.length; i++) {
    const section = conversationSections[i].trim();
    if (section.length < 100) continue; // Skip very short sections
    
    const conversation = extractConversationData(section, i);
    if (conversation) {
      conversations.push(conversation);
    }
  }
  
  return conversations;
}

function extractConversationData(sectionText, index) {
  try {
    // Extract conversation title/type from the first line
    const lines = sectionText.split('\n');
    const title = lines[0] ? lines[0].trim() : `Conversation ${index}`;
    
    // Find user messages and bot replies
    const userMessages = [];
    const botReplies = [];
    
    const conversationLines = sectionText.split('\n');
    let currentUserMessage = '';
    let currentBotReply = '';
    let isUserMessage = false;
    let isBotReply = false;
    
    for (const line of conversationLines) {
      const trimmedLine = line.trim();
      
      if (trimmedLine.startsWith('User:')) {
        // Save previous bot reply if exists
        if (currentBotReply) {
          botReplies.push(currentBotReply.trim());
          currentBotReply = '';
        }
        
        // Start new user message
        currentUserMessage = trimmedLine.replace('User:', '').trim();
        isUserMessage = true;
        isBotReply = false;
      } else if (trimmedLine.startsWith('AiPRL:')) {
        // Save previous user message if exists
        if (currentUserMessage) {
          userMessages.push(currentUserMessage.trim());
          currentUserMessage = '';
        }
        
        // Start new bot reply
        currentBotReply = trimmedLine.replace('AiPRL:', '').trim();
        isBotReply = true;
        isUserMessage = false;
      } else if (trimmedLine && !trimmedLine.startsWith('Tab ') && !trimmedLine.startsWith('Boost Mobile')) {
        // Continue current message
        if (isUserMessage) {
          currentUserMessage += ' ' + trimmedLine;
        } else if (isBotReply) {
          currentBotReply += ' ' + trimmedLine;
        }
      }
    }
    
    // Save final messages
    if (currentUserMessage) userMessages.push(currentUserMessage.trim());
    if (currentBotReply) botReplies.push(currentBotReply.trim());
    
    if (userMessages.length === 0 || botReplies.length === 0) {
      return null; // Skip if no valid conversation found
    }
    
    // Analyze conversation content for metadata
    const fullText = sectionText.toLowerCase();
    const lastUserMessage = userMessages[userMessages.length - 1];
    const lastBotReply = botReplies[botReplies.length - 1];
    
    return {
      full_name: extractCustomerName(title, sectionText),
      last_text_input: lastUserMessage,
      bot_reply: lastBotReply,
      last_seen: new Date(),
      customer_type: determineCustomerType(fullText),
      sales_intent: determineSalesIntent(fullText),
      device_interest: extractDeviceInterest(fullText),
      price_sensitivity: determinePriceSensitivity(fullText),
      competitor_mentioned: extractCompetitor(fullText),
      family_plan_interest: fullText.includes('family') || fullText.includes('daughter') || fullText.includes('son'),
      full_conversation: createFullConversation(userMessages, botReplies)
    };
    
  } catch (error) {
    console.error(`Error parsing conversation ${index}:`, error.message);
    return null;
  }
}

function extractCustomerName(title, text) {
  // Try to extract name from conversation content
  const namePatterns = [
    /I'm ([A-Z][a-z]+ [A-Z][a-z]+)/,
    /my name is ([A-Z][a-z]+ [A-Z][a-z]+)/i,
    /It's ([A-Z][a-z]+ [A-Z][a-z]+)/,
    /Sure.*?([A-Z][a-z]+ [A-Z][a-z]+)/
  ];
  
  for (const pattern of namePatterns) {
    const match = text.match(pattern);
    if (match) return match[1];
  }
  
  // Extract from title if no name found
  if (title.includes('Enthusiastic')) return 'Enthusiastic Customer';
  if (title.includes('Business')) return 'Business Customer';
  if (title.includes('Confused')) return 'Confused Senior Customer';
  if (title.includes('Impatient')) return 'Impatient Customer';
  if (title.includes('Tech-Savvy')) return 'Tech-Savvy Developer';
  if (title.includes('Budget')) return 'Budget-Conscious Student';
  if (title.includes('Loyal')) return 'Sarah Johnson';
  if (title.includes('Skeptical')) return 'Skeptical Customer';
  if (title.includes('Family')) return 'Maria Rodriguez';
  
  return `Customer from ${title}`;
}

function determineCustomerType(text) {
  if (text.includes('college') || text.includes('student') || text.includes('teen')) return 'teen';
  if (text.includes('senior') || text.includes('grandchildren') || text.includes('flip phone')) return 'senior';
  return 'adult';
}

function determineSalesIntent(text) {
  if (text.includes('just browsing') || text.includes('checking things out')) return 'browsing';
  if (text.includes('comparing') || text.includes('evaluating') || text.includes('research')) return 'comparing';
  if (text.includes('ready to buy') || text.includes('need a phone today') || text.includes('upgrade')) return 'buying';
  return 'browsing';
}

function extractDeviceInterest(text) {
  if (text.includes('iphone 16 pro')) return 'iPhone 16 Pro';
  if (text.includes('iphone 16')) return 'iPhone 16';
  if (text.includes('samsung galaxy s24 ultra')) return 'Samsung Galaxy S24 Ultra';
  if (text.includes('samsung galaxy a15')) return 'Samsung Galaxy A15 5G';
  if (text.includes('cheapest') || text.includes('budget')) return 'Budget phone';
  return 'unknown';
}

function determinePriceSensitivity(text) {
  if (text.includes('budget') || text.includes('cheap') || text.includes('fixed income') || text.includes('tight budget')) return 'high';
  if (text.includes('expensive') || text.includes('cost') || text.includes('price')) return 'medium';
  return 'low';
}

function extractCompetitor(text) {
  if (text.includes('verizon')) return 'Verizon';
  if (text.includes('att') || text.includes('at&t')) return 'ATT';
  if (text.includes('t-mobile') || text.includes('tmobile')) return 'TMobile';
  return null;
}

function createFullConversation(userMessages, botReplies) {
  const messages = [];
  const maxLength = Math.max(userMessages.length, botReplies.length);
  
  for (let i = 0; i < maxLength; i++) {
    if (userMessages[i]) {
      messages.push({
        role: 'user',
        content: userMessages[i],
        timestamp: new Date(Date.now() + i * 60000).toISOString() // Mock timestamps 1 minute apart
      });
    }
    if (botReplies[i]) {
      messages.push({
        role: 'bot',
        content: botReplies[i],
        timestamp: new Date(Date.now() + i * 60000 + 30000).toISOString() // Bot replies 30 seconds after user
      });
    }
  }
  
  return messages;
}

parseAndInsertConversations(); 