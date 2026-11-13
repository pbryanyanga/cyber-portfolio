// --- ENVIRONMENT SWITCHER & BOOT SEQUENCE ENGINE ---

function setEnvironment(env) {
  document.body.className = '';
  if (env === 'matrix') {
    document.body.classList.add('theme-matrix');
  } else if (env === 'amber') {
    document.body.classList.add('theme-amber');
  }
  var buttons = document.querySelectorAll('.theme-btn');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove('active');
  }
  var activeBtn = document.getElementById('btn' + env.charAt(0).toUpperCase() + env.slice(1));
  if (activeBtn) {
    activeBtn.classList.add('active');
  }
  localStorage.setItem('preferred_os_env', env);
}

// Initialize saved theme on load
var savedEnv = localStorage.getItem('preferred_os_env') || 'cyber';
setEnvironment(savedEnv);

// BIOS Boot Sequence Controller (Plays once per session)
(function() {
  var bootScreen = document.getElementById('bootScreen');
  var hasBooted = sessionStorage.getItem('cyber_os_booted');
  if (!hasBooted && bootScreen) {
    bootScreen.style.display = 'flex';
    sessionStorage.setItem('cyber_os_booted', 'true');
    setTimeout(function() {
      bootScreen.classList.add('fade-out');
      setTimeout(function() {
        bootScreen.style.display = 'none';
      }, 400);
    }, 1600);
  }
})();

// Real Matrix Code Rain Animation Engine
(function() {
  var canvas = document.getElementById('matrixCanvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  var characters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
  var fontSize = 14;
  var columns = Math.floor(canvas.width / fontSize);
  var drops = [];
  for (var i = 0; i < columns; i++) {
    drops[i] = 1;
  }

  function drawMatrix() {
    if (document.body.classList.contains('theme-matrix')) {
      ctx.fillStyle = 'rgba(1, 6, 1, 0.08)';
    } else if (document.body.classList.contains('theme-amber')) {
      ctx.fillStyle = 'rgba(10, 6, 1, 0.08)';
    } else {
      ctx.fillStyle = 'rgba(3, 5, 11, 0.08)';
    }
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var currentAccent = '#00f0ff';
    if (document.body.classList.contains('theme-matrix')) {
      currentAccent = '#00ff55';
    } else if (document.body.classList.contains('theme-amber')) {
      currentAccent = '#ffaa00';
    }

    ctx.fillStyle = currentAccent;
    ctx.font = fontSize + 'px "JetBrains Mono", monospace';

    for (var i = 0; i < drops.length; i++) {
      var text = characters.charAt(Math.floor(Math.random() * characters.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  setInterval(drawMatrix, 35);
})();

// CLI Terminal Navigation Handler
var cliInput = document.getElementById('cliInput');
if (cliInput) {
  cliInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      var cmd = cliInput.value.trim().toLowerCase();
      if (cmd === 'about' || cmd === '1') {
        window.location.href = 'index.html';
      } else if (cmd === 'projects' || cmd === '2') {
        window.location.href = 'projects.html';
      } else if (cmd === 'certs' || cmd === 'certifications' || cmd === '3') {
        window.location.href = 'certifications.html';
      } else if (cmd === 'contact' || cmd === '4') {
        window.location.href = 'contact.html';
      } else if (cmd === 'help') {
        alert("Available CLI Commands:\n- about: Go to About page\n- projects: View project archive\n- certs: View Cisco certifications\n- contact: Open transmission uplink");
        cliInput.value = '';
      } else {
        alert("Command not recognized: '" + cmd + "'. Type 'help' for available commands.");
        cliInput.value = '';
      }
    }
  });
}

// Certificate Modal Preview Handlers (Used in certifications.html)
function openModal(imgSrc, titleText) {
  var modalImg = document.getElementById('modalImg');
  var modalTitle = document.getElementById('modalTitle');
  var certModal = document.getElementById('certModal');
  
  if (modalImg && modalTitle && certModal) {
    modalImg.src = imgSrc;
    modalTitle.textContent = '~/credentials/' + titleText.toLowerCase().replace(/[^a-z0-9]/g, '_') + '.png';
    certModal.style.display = 'flex';
  }
}

function closeModal() {
  var certModal = document.getElementById('certModal');
  if (certModal) {
    certModal.style.display = 'none';
  }
}

window.onclick = function(event) {
  var modal = document.getElementById('certModal');
  if (event.target === modal) {
    closeModal();
  }
}