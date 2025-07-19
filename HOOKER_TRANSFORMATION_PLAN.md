# Hooker Furniture Analytics Dashboard - Transformation Plan

## Overview
Transform the current Boost Mobile customer service dashboard into a comprehensive Hooker Furniture B2B analytics platform focused on dealer relationships, inventory management, and manufacturing analytics.

## Phase 1: Core Business Model Transformation

### 1.1 Branding & Visual Identity
- **Logo**: Replace Boost Mobile logo with Hooker Furniture branding
- **Color Palette**: Transform from mobile carrier blues to furniture industry earth tones
- **Typography**: Professional furniture industry aesthetic
- **Company Name**: Change all references from "Boost Mobile" to "Hooker Furniture"

### 1.2 Business Model Pivot
**FROM:** Mobile carrier customer service analytics  
**TO:** Furniture manufacturer B2B dealer analytics

**Key Changes:**
- Customer → Dealer relationships
- Mobile plans → Furniture SKUs
- Store locations → Manufacturing facilities + Dealer network
- Support tickets → Custom orders, warranty claims, design consultations

## Phase 2: Product Catalog Integration

### 2.1 SKU Management System
Replace mobile products with **Top 10 Hooker SKUs:**

| SKU | Product Name | Category | MTD Revenue |
|-----|--------------|----------|-------------|
| HF-3124 | Savion Deux 3-Seat Power Sofa | Leather Power Sofa | $425K |
| HF-5560 | Jericho Power Sofa with Headrest | Leather Power Reclining | $390K |
| HF-2008 | Riverton Power Sofa | Leather Power Sofa | $375K |
| HF-4812 | Nelson Zero Gravity Power Sofa | Leather Power Recliner | $350K |
| HF-1103 | Fairfax Stationary Sofa | Leather Stationary | $332K |
| HF-7245 | Meridian Sofa | Leather Stationary | $318K |
| HF-8301 | Fleetwood Three-Seat Sofa | Leather Stationary | $305K |
| HF-9054 | Charleston Tufted Sofa | Leather Stationary | $292K |
| HF-6677 | Big Sky Entertainment Console | Console Credenza | $278K |
| HF-9922 | Susan G. Komen Accent Table | Accent Table | $260K |

### 2.2 Performance Tracking
- Revenue by SKU
- Out-of-stock frequency
- Lead time management
- Custom order volumes

## Phase 3: Dealer Network Analytics

### 3.1 Top Dealer Partners (by AOV)
| Dealer | AOV | Repeat Rate | Rating |
|--------|-----|-------------|--------|
| UrbanLoft | $892 | 48.2% | 4.8⭐ |
| HomeStyle | $840 | 44.1% | 4.4⭐ |
| DécorPoint | $815 | 45.7% | 4.7⭐ |
| ModernMakers | $778 | 36.7% | 4.5⭐ |
| ClassicDesigns | $760 | 38.2% | 4.6⭐ |

### 3.2 Geographic Distribution
**Inquiry Heatmap:**
- VA: 32%
- NC: 28%
- GA: 12%
- TX: 8%
- CA: 7%
- Other: 13%

### 3.3 Manufacturing Facilities
**Top 10 Locations:**
1. Martinsville, VA – Corporate HQ & Casegoods
2. Salem, VA – Upholstery manufacturing
3. Elkin, NC – Primary distribution center
4. Hickory, NC – Bradington-Young upholstery
5. High Point, NC – Trade showroom
6. Wilson, NC – Secondary distribution
7. Morganton, NC – Regional fulfillment
8. Las Vegas, NV – Trade showroom
9. Chicago, IL – Trade market showroom
10. Atlanta, GA – Dealer support office

## Phase 4: Conversation Analytics Redesign

### 4.1 Conversation Categories
**Transform from mobile support to furniture business:**

| Old Category | New Category | Focus |
|--------------|--------------|-------|
| Plan Changes | Custom Orders | Dimensions, finishes, fabrics |
| Billing Issues | Warranty Claims | Damage, defects, returns |
| Technical Support | Design Consultation | Fabric selection, room planning |
| Account Management | Dealer Relations | AOV, repeat orders, performance |

### 4.2 Key Metrics from Conversations
**Top 15 Analytics to Track:**

1. **Average Order Value by Dealer** - Track dealer performance
2. **Return & Refund Rates** - Quality control (12.3% finish mismatch leading)
3. **Chat Volume by Hour** - Staffing optimization (Mon 10-11 AM peak: 182 chats)
4. **Agent Performance** - CSAT and chat volume tracking
5. **SLA Compliance** - % responses under 2 min target
6. **Repeat Order Rate** - Dealer loyalty (30/60/90 day windows)
7. **Top-Performing SKUs** - Revenue and volume tracking
8. **Out-of-Stock Frequency** - Inventory management
9. **Cost per Conversation** - Operational efficiency
10. **Net Promoter Score** - Partner satisfaction
11. **Channel Distribution** - Chat vs phone vs email trends
12. **Knowledge-Base Effectiveness** - Self-serve success rates
13. **Custom Order Requests** - Revenue opportunity tracking
14. **Cart/Quote Abandonment** - Conversion optimization
15. **Marketing Campaign Impact** - ROI measurement

### 4.3 Conversation Types & Volume
**Based on 100 sample conversations:**
- **Resellers**: 82% (21 conversations)
- **Designers**: 13% (3 conversations)  
- **Direct Consumers**: 5% (1 conversation - routed to dealers)

## Phase 5: Knowledge Base Transformation

### 5.1 Furniture-Specific Articles
**Top KB Articles by Self-Serve Rate:**

| Article | Self-Serve Rate | Topic |
|---------|-----------------|-------|
| Order Status FAQ | 82% | Shipping & tracking |
| Finish Options Guide | 79% | Color & material selection |
| Warranty Policy Overview | 75% | Coverage & claims |
| Leather Care Tips | 72% | Maintenance |
| Custom Dimensions Guide | 68% | Special orders |

### 5.2 Auto-Tagging Logic
**Conversation Routing:**
- "Out of stock," "OOS" → Low Stock Alert
- "Seam tear," "rip," "damage" → Warranty/Claims
- "Custom dimensions," "96×40" → Custom Order
- "Finish sample," "swatch" → Sample Request
- "Book showroom," "schedule tour" → Appointment

## Phase 6: Technical Implementation

### 6.1 Database Schema Changes
**Key Tables to Create/Modify:**
- `dealers` - Partner information, ratings, AOV
- `products` - Hooker SKU catalog with performance data
- `manufacturing_facilities` - Production and distribution centers
- `custom_orders` - Special requests and quotes
- `conversation_categories` - Furniture industry topics

### 6.2 API Endpoints to Update
- `/api/dealers` - Dealer performance metrics
- `/api/inventory` - Stock levels and lead times
- `/api/products` - SKU analytics
- `/api/facilities` - Manufacturing status
- `/api/conversations` - Updated parsing for furniture terminology

### 6.3 Component Updates
**Major UI Components:**
- `DealerPerformanceMap` (replace StorePerformanceMap)
- `InventoryDashboard` (new)
- `CustomOrderTracking` (new)
- `ManufacturingStatus` (new)
- `FurnitureTopicAnalysis` (updated)

## Phase 7: Data Migration Strategy

### 7.1 Conversation Data
- Parse existing conversations for reusable patterns
- Implement 100 sample Hooker conversations from HOOKERCONVOS.MD
- Train AI on furniture industry terminology

### 7.2 Historical Analytics
- Maintain dashboard structure but populate with furniture industry benchmarks
- Use Hooker's actual performance data where available
- Simulate realistic B2B furniture metrics

## Success Metrics

### 7.1 Dashboard Functionality
- [ ] All 15 key furniture metrics displaying correctly
- [ ] Dealer network map showing 3,000+ partners
- [ ] SKU performance tracking for top 10 products
- [ ] Custom order workflow operational
- [ ] Knowledge base with furniture-specific content

### 7.2 User Experience
- [ ] Seamless navigation for furniture industry users
- [ ] Responsive design for showroom and office use
- [ ] Real-time inventory and order tracking
- [ ] Effective dealer performance analytics

## Timeline
- **Phase 1-2**: Branding & Product Catalog (2-3 days)
- **Phase 3-4**: Dealer Network & Conversations (3-4 days)  
- **Phase 5-6**: Knowledge Base & Technical (2-3 days)
- **Phase 7**: Data Migration & Testing (1-2 days)

**Total Estimated Timeline: 8-12 days**

---

*This transformation leverages the rich conversation data and analytics framework in HOOKERCONVOS.MD to create a comprehensive furniture industry B2B dashboard.* 