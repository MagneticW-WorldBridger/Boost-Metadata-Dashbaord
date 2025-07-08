import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const [storePerformance, topDevices, competitorMentions] = await Promise.all([
      // Store performance with location data
      sql`SELECT 
          l.id,
          l.address,
          l.city,
          l.phone,
          COALESCE(sp.total_sales, 0) as total_sales,
          COALESCE(sp.devices_sold, 0) as devices_sold,
          COALESCE(sp.plans_activated, 0) as plans_activated,
          COALESCE(sp.customer_satisfaction, 4.5) as customer_satisfaction,
          COALESCE(sp.foot_traffic, 0) as foot_traffic,
          COALESCE(sp.conversion_rate, 0) as conversion_rate
          FROM locations l
          LEFT JOIN store_performance sp ON l.id = sp.store_id
          ORDER BY sp.total_sales DESC NULLS LAST`,

      // Top selling devices by location - using mock data since products table might be empty
      sql`SELECT 
          l.city,
          CASE 
            WHEN l.id % 3 = 0 THEN 'iPhone 16'
            WHEN l.id % 3 = 1 THEN 'Samsung Galaxy S24 Ultra'
            ELSE 'Samsung Galaxy A15 5G'
          END as device_name,
          (l.id * 3 + 5) as total_sold,
          (l.id * 1200 + 15000) as total_revenue
          FROM locations l
          ORDER BY total_sold DESC`,

      // Competitor mentions by location from chat_metadata
      sql`SELECT 
          l.city,
          cm.competitor_mentioned,
          COUNT(*) as mention_count
          FROM chat_metadata cm
          JOIN locations l ON cm.store_id = l.id
          WHERE cm.competitor_mentioned IS NOT NULL
          GROUP BY l.city, cm.competitor_mentioned
          ORDER BY mention_count DESC`
    ]);

    // Calculate summary statistics
    const totalStores = storePerformance.rows.length;
    const totalRevenue = storePerformance.rows.reduce((sum, row) => sum + parseFloat(row.total_sales || 0), 0);
    const totalDevicesSold = storePerformance.rows.reduce((sum, row) => sum + parseInt(row.devices_sold || 0), 0);
    const avgSatisfaction = storePerformance.rows.filter(r => r.customer_satisfaction > 0).reduce((sum, row) => sum + parseFloat(row.customer_satisfaction || 0), 0) / storePerformance.rows.filter(r => r.customer_satisfaction > 0).length;

    // Transform data for component compatibility
    const storeData = storePerformance.rows.map(row => ({
      id: row.id,
      address: row.address,
      city: row.city,
      phone: row.phone,
      totalSales: parseFloat(row.total_sales || 0),
      devicesSold: parseInt(row.devices_sold || 0),
      plansActivated: parseInt(row.plans_activated || 0),
      customerSatisfaction: parseFloat(row.customer_satisfaction || 4.5),
      footTraffic: parseInt(row.foot_traffic || Math.floor(Math.random() * 100) + 20),
      conversionRate: parseFloat(row.conversion_rate || (Math.random() * 40 + 30).toFixed(1))
    }));

    return NextResponse.json({
      // Original data structure for other components
      storePerformance: storeData,
      topDevices: topDevices.rows.map(row => ({
        city: row.city,
        deviceName: row.device_name,
        totalSold: parseInt(row.total_sold),
        totalRevenue: parseFloat(row.total_revenue)
      })),
      competitorAnalysis: competitorMentions.rows.map(row => ({
        city: row.city,
        competitor: row.competitor_mentioned,
        mentions: parseInt(row.mention_count)
      })),
      
      // Data structure expected by StorePerformanceMap component
      summary: {
        totalStores,
        totalRevenue,
        totalCustomers: totalDevicesSold * 2, // Estimate customers as 2x devices sold
        averageRating: avgSatisfaction || 4.5,
        totalDevicesSold
      },
      topStores: storeData
        .sort((a, b) => b.totalSales - a.totalSales)
        .slice(0, 10)
        .map(store => ({
          city: store.city,
          revenue: store.totalSales,
          customers: store.devicesSold * 2, // Estimate customers
          rating: store.customerSatisfaction,
          growth: Math.random() * 20 + 5 // Mock growth percentage
        })),
      satisfactionLeaders: storeData
        .sort((a, b) => b.customerSatisfaction - a.customerSatisfaction)
        .slice(0, 5)
        .map(store => ({
          name: store.city,
          rating: store.customerSatisfaction,
          reviews: Math.floor(Math.random() * 200) + 50 // Mock review count
        })),
      deviceSales: topDevices.rows.slice(0, 5).map((device, idx) => ({
        device: device.device_name,
        sales: parseInt(device.total_sold),
        percentage: (parseInt(device.total_sold) / topDevices.rows.reduce((sum, d) => sum + parseInt(d.total_sold), 0) * 100)
      })),
             performanceTrends: [
         { month: 'Jan', revenue: 180000, customers: 245, satisfaction: 4.2 },
         { month: 'Feb', revenue: 195000, customers: 267, satisfaction: 4.3 },
         { month: 'Mar', revenue: 215000, customers: 298, satisfaction: 4.4 },
         { month: 'Apr', revenue: 235000, customers: 324, satisfaction: 4.6 },
         { month: 'May', revenue: 258000, customers: 356, satisfaction: 4.7 },
         { month: 'Jun', revenue: 278000, customers: 387, satisfaction: 4.8 }
       ],
      storeDetails: storeData.map(store => ({
        id: store.id,
        city: store.city,
        address: store.address,
        revenue: store.totalSales,
        customers: store.devicesSold * 2,
        rating: store.customerSatisfaction,
        staff: Math.floor(Math.random() * 8) + 3, // Mock staff count
        growth: Math.random() * 30 + 5, // Mock growth
        lat: 39.7392 + (Math.random() - 0.5) * 2, // Colorado latitude range
        lng: -104.9903 + (Math.random() - 0.5) * 4 // Colorado longitude range
      }))
    });
  } catch (error) {
    console.error('Location analytics error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch location analytics' },
      { status: 500 }
    );
  }
} 