document.addEventListener('DOMContentLoaded', () => {

  // --- Hero Section Logic ---
  const heroSection = document.getElementById('hero-section');
  if (heroSection) {
    const backgroundImages = [
      "https://images.unsplash.com/photo-1623784373624-26fb62d3076d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBsYW5kc2NhcGUlMjBiZWFjaHxlbnwxfHx8fDE3NjkwNjY5MTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1597434429739-2574d7e06807?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMG5hdHVyZSUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NjkwNjY5MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1754413941444-508fe968e845?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMG9jZWFuJTIwd2F2ZXN8ZW58MXx8fHwxNzY4OTgwMTY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    ];
    let currentImageIndex = 0;

    const imageDivs = backgroundImages.map((src, index) => {
        const div = document.createElement('div');
        div.className = "absolute inset-0 transition-opacity duration-2000 ease-in-out";
        div.style.backgroundImage = `url(${src})`;
        div.style.backgroundSize = 'cover';
        div.style.backgroundPosition = 'center';
        div.style.backgroundRepeat = 'no-repeat';
        div.style.opacity = index === 0 ? '1' : '0';
        // Insert before the dark overlay
        heroSection.insertBefore(div, heroSection.firstChild);
        return div;
    });

    setInterval(() => {
      imageDivs[currentImageIndex].style.opacity = '0';
      currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
      imageDivs[currentImageIndex].style.opacity = '1';
    }, 5000);
  }

  // --- Button Click Handlers ---
  const searchButton = document.getElementById('search-button');
  if (searchButton) {
    searchButton.addEventListener('click', () => {
      const destination = document.getElementById('destination').value;
      const startDate = document.getElementById('start-date').value;
      const endDate = document.getElementById('end-date').value;
      const guests = document.getElementById('guests').value;
      const theme = document.getElementById('theme').value;

      const params = new URLSearchParams();
      if (destination) params.set("destination", destination);
      if (startDate) params.set("from", startDate);
      if (endDate) params.set("to", endDate);
      if (guests) params.set("guests", guests);
      if (theme) params.set("theme", theme);
      
      // Redirect to a results.html page (which doesn't exist yet)
      window.location.href = `results.html?${params.toString()}`;
    });
  }

  const aiWizardButton = document.getElementById('ai-wizard-button');
  if (aiWizardButton) {
    aiWizardButton.addEventListener('click', () => {
      // Redirect to a wizard.html page (which doesn't exist yet)
      window.location.href = 'wizard.html';
    });
  }

});