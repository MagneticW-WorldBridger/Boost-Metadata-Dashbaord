# 🚀 Frontend Developer Guide - Rural King Analytics Dashboard

## 🎯 **START HERE - Main Dashboard Files**

### **Primary Dashboard File: `src/app/analytics/page.tsx`**
This is your **MAIN DASHBOARD** file that your frontend developer should start editing. It contains:
- Complete dashboard layout with tabs
- All major components and data visualization
- Main styling and structure
- Tab navigation system

### **Landing Page: `src/app/page.tsx`**
This is the splash page that auto-redirects to the dashboard after 3 seconds.

---

## 🏗️ **Dashboard Architecture Overview**

### **File Structure**
```
src/app/
├── page.tsx                    # Landing page (auto-redirects)
├── analytics/
│   └── page.tsx              # 🎯 MAIN DASHBOARD - START EDITING HERE
├── components/                # Reusable dashboard components
│   ├── AIChatIntelligence.tsx
│   ├── ChatView.tsx
│   ├── EnhancedResponsePatterns.tsx
│   ├── EnhancedTopicAnalysis.tsx
│   ├── LiveMetricsDashboard.tsx
│   └── StorePerformanceMap.tsx
└── utils/
    ├── chatParser.ts         # Data parsing utilities
    └── conversationParser.ts
```

---

## 🎨 **Dashboard Components Breakdown**

### **1. Main Dashboard (`src/app/analytics/page.tsx`)**
- **Header Section**: Company branding and status indicators
- **KPI Cards**: 4 main metric cards showing key performance indicators
- **Tab System**: 5 main tabs for different dashboard sections
- **Data Integration**: Connects to API endpoints for real-time data

### **2. Tab Content**
- **Tab 1**: Live Dealer Analytics (`LiveMetricsDashboard` component)
- **Tab 2**: Facilities & Network (`StorePerformanceMap` component)
- **Tab 3**: Performance Metrics (Built-in charts and analytics)
- **Tab 4**: Dealer Conversations (Chat analysis and history)
- **Tab 5**: Topics & Insights (`EnhancedTopicAnalysis` component)

### **3. Key Components**
- **`LiveMetricsDashboard`**: Real-time metrics and charts
- **`StorePerformanceMap`**: Geographic store performance visualization
- **`EnhancedTopicAnalysis`**: AI-powered topic analysis
- **`AIChatIntelligence`**: Floating AI assistant (crown jewel feature)

---

## 🚀 **How to Start Editing**

### **Step 1: Open the Main Dashboard**
```bash
# Navigate to the main dashboard file
src/app/analytics/page.tsx
```

### **Step 2: Understand the Structure**
The dashboard is built with:
- **Next.js 14** with App Router
- **Tremor** for charts and UI components
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Custom CSS variables** for consistent spacing

### **Step 3: Key Areas to Modify**
1. **Header Section** (lines ~200-250): Company branding and status
2. **KPI Cards** (lines ~300-400): Main metric displays
3. **Tab Content** (lines ~500-800): Individual tab implementations
4. **Styling Classes**: Look for `rk-card`, `metric-card`, `card-premium`

---

## 🎨 **Styling System**

### **Custom CSS Classes**
- **`rk-card`**: Main card containers
- **`metric-card`**: KPI metric cards
- **`card-premium`**: Enhanced feature cards
- **`btn-primary`**: Primary action buttons
- **`status-success/warning/error`**: Status indicators

### **CSS Variables (Perfect Spacing System)**
```css
--space-5: 0.3125rem    /* 5px */
--space-8: 0.5rem       /* 8px */
--space-13: 0.8125rem   /* 13px */
--space-21: 1.3125rem   /* 21px */
--space-34: 2.125rem    /* 34px */
--space-55: 3.4375rem   /* 55px */
--space-89: 5.5625rem   /* 89px */
```

---

## 📊 **Data Integration**

### **API Endpoints**
- **`/api/analytics`**: Main dashboard data
- **`/api/curated-conversations`**: Conversation data
- **`/api/chat-query`**: Chat analysis
- **`/api/locations`**: Store location data

### **Data Structure**
The dashboard expects data in this format:
```typescript
type AnalyticsData = {
  overview: {
    totalConversations: number;
    totalUserMessages: number;
    totalBotMessages: number;
    conversationsNeedingImprovement: number;
    improvementRate: string;
  };
  topicAnalysis: { /* ... */ };
  responsePatterns: { /* ... */ };
  detailedConversations: Array<{ /* ... */ }>;
  // ... more fields
};
```

---

## 🔧 **Development Commands**

### **Install Dependencies**
```bash
npm install
# or
yarn install
```

### **Run Development Server**
```bash
npm run dev
# or
yarn dev
```

### **Build for Production**
```bash
npm run build
# or
yarn build
```

---

## 🎯 **Quick Start for Frontend Dev**

### **1. Modify Dashboard Layout**
Edit `src/app/analytics/page.tsx` to:
- Change tab names and content
- Modify KPI card metrics
- Update header branding
- Adjust color schemes

### **2. Update Components**
Each component in `src/app/components/` can be modified independently:
- `LiveMetricsDashboard.tsx` - Real-time charts
- `StorePerformanceMap.tsx` - Geographic visualization
- `EnhancedTopicAnalysis.tsx` - AI insights

### **3. Customize Styling**
- Modify `src/app/globals.css` for global styles
- Update Tailwind classes in components
- Adjust CSS variables for spacing

---

## 🚨 **Important Notes**

### **Current Branding**
- **Company**: Rural King (Farm Supply)
- **Product**: Store Intelligence Center
- **Theme**: Farm supply analytics with AI insights

### **Embed Mode Support**
The dashboard supports embed mode via URL parameter `?embed=1` for integration into other systems.

### **Responsive Design**
Built with mobile-first approach using Tailwind's responsive classes.

---

## 📞 **Need Help?**

### **Key Files to Reference**
1. **`src/app/analytics/page.tsx`** - Main dashboard (START HERE)
2. **`src/app/globals.css`** - Global styles and CSS variables
3. **`tailwind.config.js`** - Tailwind configuration
4. **`package.json`** - Dependencies and scripts

### **Component Dependencies**
- **Tremor**: Charts and UI components
- **Lucide React**: Icon library
- **Next.js**: Framework and routing
- **Tailwind CSS**: Utility-first CSS framework

---

## 🎉 **You're Ready to Start!**

Open `src/app/analytics/page.tsx` and start customizing your dashboard. This file contains everything you need to create a beautiful, functional analytics dashboard for Rural King's farm supply business.

**Happy coding! 🚀**
