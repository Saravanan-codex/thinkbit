document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile Menu Toggle ---
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const mobileBackdrop = document.querySelector('.mobile-backdrop');

  menuToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });

  mobileBackdrop?.addEventListener('click', () => {
    navLinks.classList.remove('active');
    menuToggle.classList.remove('active');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
    }
  });

  navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
    });
  });

  // --- Hero Text Rotator ---
  const textSets = document.querySelectorAll('.text-set');
  let currentIndex = 0;
  setInterval(() => {
    if (textSets.length) {
      textSets[currentIndex].classList.remove('active');
      currentIndex = (currentIndex + 1) % textSets.length;
      textSets[currentIndex].classList.add('active');
    }
  }, 3500);

  // --- Team Registration ---
  const form = document.querySelector('.contact-form'); // Team form
  const teamEvents = document.querySelectorAll('.team-event');
  const teamBox = document.getElementById('team-box');
  const newTeamBox = document.getElementById('new-team-box');
  const existingTeamBox = document.getElementById('existing-team-box');
  const teamNameInput = document.getElementById('TeamName');
  const teamIdInput = document.getElementById('TeamId');
  const teamNameError = document.getElementById('team-name-error');
  const teamIdError = document.getElementById('team-id-error');
  const teamOptionRadios = document.querySelectorAll('input[name="teamOption"]');

  // Show/Hide team box based on event selection
  teamEvents.forEach(ev => {
    ev.addEventListener('change', () => {
      const anyTeamSelected = document.querySelectorAll('.team-event:checked').length > 0;
      teamBox.style.display = anyTeamSelected ? 'block' : 'none';
      if (!anyTeamSelected) {
        teamNameInput.value = '';
        teamIdInput.value = '';
        teamNameError.style.display = 'none';
        teamIdError.style.display = 'none';
        newTeamBox.style.display = 'block';
        existingTeamBox.style.display = 'none';
        teamOptionRadios[0].checked = true;
      }
    });
  });

  // Toggle between New Team / Existing Team
  teamOptionRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.value === 'new') {
        newTeamBox.style.display = 'block';
        existingTeamBox.style.display = 'none';
      } else {
        newTeamBox.style.display = 'none';
        existingTeamBox.style.display = 'block';
      }
    });
  });

  // Submit Team Form
  form?.addEventListener('submit', async function (e) {
    e.preventDefault();

    const technicalChecked = document.querySelectorAll('.technical-event:checked').length;
    if (technicalChecked === 0) {
      return alert('Please select at least one Technical event. It is compulsory.');
    }

    teamNameError.style.display = 'none';
    teamIdError.style.display = 'none';
    let proceed = true;

    if (document.querySelectorAll('.team-event:checked').length > 0) {
      const selectedOption = document.querySelector('input[name="teamOption"]:checked').value;

      if (selectedOption === 'new') {
        const teamName = teamNameInput.value.trim();
        if (!teamName) {
          alert("Please enter a team name for team events.");
          proceed = false;
        } else {
          try {
            const response = await fetch(`https://localhost:5007/check-team?team=${encodeURIComponent(teamName)}`);
            const data = await response.json();
            if (data.exists) {
              teamNameError.style.display = 'block';
              proceed = false;
            }
          } catch (err) {
            console.error("Error checking team name:", err);
            alert("⚠️ Server error while checking team name.");
            proceed = false;
          }
        }
      } else if (selectedOption === 'join') {
        const teamId = teamIdInput.value.trim().toUpperCase();
        if (!teamId) {
          alert("Please enter an existing team ID to join.");
          proceed = false;
        }
      }
    }

    if (!proceed) return;

    const formData = new FormData(form);
    try {
      const res = await fetch('https://localhost:5007/register', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();

      if (data.studentId) {
        let msg = `✅ Registration Successful!\n\nYour Student ID: ${data.studentId}`;
        if (data.teamId) msg += `\nYour Team ID: ${data.teamId}`;
        alert(msg);

        form.reset();
        teamBox.style.display = 'none';
        newTeamBox.style.display = 'block';
        existingTeamBox.style.display = 'none';
        teamNameError.style.display = 'none';
        teamIdError.style.display = 'none';
        teamOptionRadios[0].checked = true;
      } else {
        alert("❌ Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("⚠️ Server error. Please try later.");
    }
  });


  // --- Back To Top ---
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (backToTop) backToTop.hidden = window.scrollY < 300;
  });
  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // --- Nav styling on scroll ---
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) nav?.classList.add('scrolled');
    else nav?.classList.remove('scrolled');
  });
});
