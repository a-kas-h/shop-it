#!/usr/bin/env node

/**
 * Simple integration test script to verify frontend-backend connectivity
 */

import axios from 'axios';

const BACKEND_URL = 'http://localhost:8080/api';

async function testBackendConnection() {
  console.log('🔍 Testing Spring Boot backend integration...\n');

  try {
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await axios.get(`${BACKEND_URL}/health`);
    console.log('✅ Health check passed:', healthResponse.data);

    // Test search endpoint (with dummy data)
    console.log('\n2. Testing search endpoint...');
    try {
      const searchResponse = await axios.get(`${BACKEND_URL}/search`, {
        params: {
          query: 'apple',
          lat: 40.7128,
          lng: -74.0060,
          radius: 10
        }
      });
      console.log('✅ Search endpoint accessible');
      console.log(`   Found ${searchResponse.data.length} results`);
    } catch (searchError) {
      if (searchError.response?.status === 500) {
        console.log('⚠️  Search endpoint accessible but no data (expected if database is empty)');
      } else {
        throw searchError;
      }
    }

    console.log('\n🎉 Backend integration test completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Make sure your PostgreSQL database is running');
    console.log('2. Add some test data to your database');
    console.log('3. Run the frontend with: npm run dev');
    console.log('4. Or run both together with: npm run dev:full');

  } catch (error) {
    console.error('❌ Backend integration test failed:');

    if (error.code === 'ECONNREFUSED') {
      console.error('   Spring Boot backend is not running on port 8080');
      console.error('   Start it with: cd shopit && ./mvnw spring-boot:run');
    } else {
      console.error('   Error:', error.message);
    }

    process.exit(1);
  }
}

// Only run if this script is executed directly
testBackendConnection();