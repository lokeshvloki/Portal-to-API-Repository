document.addEventListener('DOMContentLoaded', () => {
    const apiList = document.getElementById('api-list');
    const addApiForm = document.getElementById('add-api-form');
    const contactForm = document.getElementById('contact-form');
    const toggleThemeBtn = document.getElementById('toggle-theme');
    const developerInfoBtn = document.getElementById('developer-info');
    const developerDetails = document.getElementById('developer-details');
    const body = document.body;
  
    // Load APIs from the server
    const fetchApis = async () => {
      const response = await fetch('/apis');
      const apis = await response.json();
      apiList.innerHTML = '';
      apis.forEach((api) => {
        const apiCard = document.createElement('div');
        apiCard.className = 'api-card';
        apiCard.innerHTML = `
          <h3>${api.name}</h3>
          <p>${api.description}</p>
          <a href="${api.website}" target="_blank">Visit</a>
          <p><strong>Added by:</strong> ${api.email}</p>
        `;
        apiList.appendChild(apiCard);
      });
    };
  
    // Add API to the server
    addApiForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('api-name').value;
      const description = document.getElementById('api-description').value;
      const website = document.getElementById('api-website').value;
      const email = document.getElementById('user-email').value;
  
      await fetch('/apis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, website, email }),
      });
  
      fetchApis(); // Reload the API list
      addApiForm.reset();
    });
  
    // Contact form submission
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('user-name').value;
      const email = document.getElementById('contact-email').value;
      const query = document.getElementById('user-query').value;
  
      await fetch('/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, query }),
      });
  
      alert('Your query has been submitted.');
      contactForm.reset();
    });
  
    // Theme Toggle
    toggleThemeBtn.addEventListener('click', () => {
      body.classList.toggle('dark-theme');
    });
  
    // Show/Hide Developer Info
    developerInfoBtn.addEventListener('click', () => {
      developerDetails.classList.toggle('hidden');
    });
  
    fetchApis(); // Load APIs initially
});
