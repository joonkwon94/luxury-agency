document.addEventListener("DOMContentLoaded", () => {
  // Tab Navigation Logic
  const navItems = document.querySelectorAll('.nav-item');
  const tabContents = document.querySelectorAll('.tab-content');

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      
      navItems.forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');
      
      tabContents.forEach(tab => tab.classList.remove('active'));
      
      const targetId = item.getAttribute('data-target');
      document.getElementById(targetId).classList.add('active');
    });
  });

  // Chart.js Initialization for BI Dashboard
  const ctx = document.getElementById('salesChart');
  if (ctx) {
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: '구매 전환율 (%)',
          data: [2.5, 3.2, 3.0, 4.5, 4.2, 5.8],
          borderColor: '#d4af37',
          backgroundColor: 'rgba(212, 175, 55, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  // Google Sheets Integration Logic
  const sourcingForm = document.getElementById('sourcingForm');
  const submitBtn = document.getElementById('submitBtn');
  const formStatus = document.getElementById('formStatus');

  // ** IMPORTANT: Replace this with your actual Web App URL after creating the Apps Script **
  const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_SCRIPT_WEB_APP_URL";

  if (sourcingForm) {
    sourcingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const sourceUrl = document.getElementById('sourceUrl').value;
      const productName = document.getElementById('productName').value;
      const costPrice = document.getElementById('costPrice').value;

      submitBtn.disabled = true;
      submitBtn.innerText = '저장 중...';
      formStatus.innerText = '';
      formStatus.style.color = 'inherit';

      if(GOOGLE_SCRIPT_URL === "YOUR_GOOGLE_SCRIPT_WEB_APP_URL") {
          formStatus.innerText = "❌ 경고: 구글 Apps Script 웹앱 URL이 연동되지 않았습니다. 코드를 확인해주세요.";
          formStatus.style.color = "red";
          submitBtn.disabled = false;
          submitBtn.innerText = '구글 시트에 저장하기';
          return;
      }

      // Send data to Google Sheets via Apps Script Web App
      fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Bypass CORS for simple POST
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          'url': sourceUrl,
          'product': productName,
          'cost': costPrice,
          'timestamp': new Date().toISOString()
        })
      })
      .then(response => {
        // Because of no-cors, response is opaque. We assume success if no network error.
        formStatus.innerText = '✅ 성공적으로 구글 시트에 저장되었습니다!';
        formStatus.style.color = 'green';
        sourcingForm.reset();
      })
      .catch(error => {
        console.error('Error!', error.message);
        formStatus.innerText = '❌ 저장 중 오류가 발생했습니다.';
        formStatus.style.color = 'red';
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerText = '구글 시트에 저장하기';
      });
    });
  }
});
