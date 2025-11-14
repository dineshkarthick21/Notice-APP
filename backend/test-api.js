const http = require('http');

const BASE_URL = 'http://localhost:5000';
let adminToken = '';
let noticeId = '';

function request(method, path, body = null, token = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function runTests() {
  console.log('\n====== MERN API TESTS ======\n');

  try {
    // Test 1: Signup Admin
    console.log('1️⃣ Testing Signup (Admin)...');
    let res = await request('POST', '/api/auth/signup', {
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin',
    });
    console.log(`   Status: ${res.status}`, res.status === 201 ? '✅' : '❌');
    console.log(`   ${res.data.message}\n`);

    // Test 2: Signup Regular User
    console.log('2️⃣ Testing Signup (User)...');
    res = await request('POST', '/api/auth/signup', {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      role: 'user',
    });
    console.log(`   Status: ${res.status}`, res.status === 201 ? '✅' : '❌');
    console.log(`   ${res.data.message}\n`);

    // Test 3: Login Admin
    console.log('3️⃣ Testing Login (Admin)...');
    res = await request('POST', '/api/auth/login', {
      email: 'admin@example.com',
      password: 'admin123',
    });
    console.log(`   Status: ${res.status}`, res.status === 200 ? '✅' : '❌');
    console.log(`   ${res.data.message}`);
    console.log(`   Token: ${res.data.token ? res.data.token.substring(0, 20) + '...' : 'N/A'}`);
    console.log(`   Role: ${res.data.role}\n`);
    adminToken = res.data.token;

    // Test 4: Login Regular User
    console.log('4️⃣ Testing Login (User)...');
    res = await request('POST', '/api/auth/login', {
      email: 'john@example.com',
      password: 'password123',
    });
    console.log(`   Status: ${res.status}`, res.status === 200 ? '✅' : '❌');
    console.log(`   ${res.data.message}`);
    console.log(`   Role: ${res.data.role}\n`);

    // Test 5: Get All Notices (No Auth)
    console.log('5️⃣ Testing Get All Notices (No Auth)...');
    res = await request('GET', '/api/notices');
    console.log(`   Status: ${res.status}`, res.status === 200 ? '✅' : '❌');
    console.log(`   Notices count: ${res.data.notices?.length || 0}\n`);

    // Test 6: Create Notice (Admin Only)
    console.log('6️⃣ Testing Create Notice (Admin)...');
    res = await request(
      'POST',
      '/api/notices',
      {
        title: 'Annual Holidays',
        date: '2025-12-25',
        type: 'leave',
      },
      adminToken
    );
    console.log(`   Status: ${res.status}`, res.status === 201 ? '✅' : '❌');
    console.log(`   ${res.data.message}`);
    if (res.data.notice) {
      noticeId = res.data.notice._id;
      console.log(`   Notice ID: ${noticeId}\n`);
    }

    // Test 7: Get Notice by ID
    if (noticeId) {
      console.log('7️⃣ Testing Get Notice by ID...');
      res = await request('GET', `/api/notices/${noticeId}`);
      console.log(`   Status: ${res.status}`, res.status === 200 ? '✅' : '❌');
      console.log(`   Title: ${res.data.notice?.title}\n`);
    }

    // Test 8: Update Notice (Admin Only)
    if (noticeId) {
      console.log('8️⃣ Testing Update Notice (Admin)...');
      res = await request(
        'PUT',
        `/api/notices/${noticeId}`,
        {
          title: 'Updated Holiday Notice',
          date: '2025-12-26',
          type: 'leave',
        },
        adminToken
      );
      console.log(`   Status: ${res.status}`, res.status === 200 ? '✅' : '❌');
      console.log(`   ${res.data.message}\n`);
    }

    // Test 9: Delete Notice (Admin Only)
    if (noticeId) {
      console.log('9️⃣ Testing Delete Notice (Admin)...');
      res = await request('DELETE', `/api/notices/${noticeId}`, null, adminToken);
      console.log(`   Status: ${res.status}`, res.status === 200 ? '✅' : '❌');
      console.log(`   ${res.data.message}\n`);
    }

    console.log('====== TESTS COMPLETED ======\n');
  } catch (err) {
    console.error('❌ Test Error:', err.message);
  }

  process.exit(0);
}

// Wait 2 seconds for server to fully start
setTimeout(runTests, 2000);
