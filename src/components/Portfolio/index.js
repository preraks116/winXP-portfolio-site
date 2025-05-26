// src/components/Portfolio/index.js
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Portfolio = ({ onOpenApp, className }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    // Create the portfolio HTML content
    const portfolioHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>John Developer - Personal Portfolio</title>
    <style>
        /* Early 2000s Web Styling */
        body {
            font-family: Arial, Verdana, sans-serif;
            font-size: 12px;
            background-color: #ffffff;
            margin: 0;
            padding: 0;
            overflow: auto; /* Allow scrolling but let parent handle it */
            height: auto; /* Let content determine height */
            background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==');
        }
        
        /* Classic table-based layout */
        .main-table {
            width: 100%;
            height: auto; /* Let content determine height */
            border: 0;
            cellpadding: 0;
            cellspacing: 0;
            table-layout: fixed; /* Fixed layout for better control */
        }
        
        /* Header styling */
        .header {
            background: linear-gradient(to bottom, #4a90e2, #2171b5);
            color: white;
            text-align: center;
            padding: 20px;
            border-bottom: 3px solid #1a5490;
        }
        
        .header h1 {
            font-size: 24px;
            margin: 0;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
            font-family: 'Times New Roman', serif;
        }
        
        .header .subtitle {
            font-size: 14px;
            margin-top: 5px;
            font-style: italic;
        }
        
        /* Navigation bar */
        .navbar {
            background-color: #e0e0e0;
            border-bottom: 2px solid #999;
            padding: 0;
        }
        
        .navbar table {
            width: 100%;
            border-collapse: collapse;
        }
        
        .nav-item {
            background-color: #e0e0e0;
            border-right: 1px solid #999;
            padding: 8px 15px;
            text-align: center;
            cursor: pointer;
            font-weight: bold;
            font-size: 11px;
        }
        
        .nav-item:hover {
            background-color: #d0d0d0;
            text-decoration: underline;
        }
        
        .nav-item.active {
            background-color: #ffffff;
            border-bottom: 2px solid #ffffff;
        }
        
        /* Content area */
        .content-wrapper {
            display: flex;
            min-height: 500px;
        }
        
        .sidebar {
            width: 200px;
            background-color: #f0f0f0;
            border-right: 1px solid #ccc;
            padding: 15px;
        }
        
        .main-content {
            flex: 1;
            padding: 20px;
            background-color: #ffffff;
        }
        
        /* Sidebar styling */
        .sidebar h3 {
            color: #2171b5;
            font-size: 14px;
            border-bottom: 1px solid #ccc;
            padding-bottom: 5px;
            margin-top: 20px;
        }
        
        .sidebar h3:first-child {
            margin-top: 0;
        }
        
        .sidebar ul {
            list-style: none;
            padding: 0;
            margin: 5px 0;
        }
        
        .sidebar li {
            margin: 5px 0;
        }
        
        .sidebar a {
            color: #0066cc;
            text-decoration: none;
            font-size: 11px;
        }
        
        .sidebar a:hover {
            text-decoration: underline;
        }
        
        /* Visitor counter styling */
        .visitor-counter {
            background-color: #000000;
            color: #00ff00;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            padding: 5px;
            text-align: center;
            border: 2px inset #ccc;
            margin: 10px 0;
        }
        
        /* Main content styling */
        .welcome-message {
            background-color: #fffacd;
            border: 2px solid #ffd700;
            padding: 15px;
            margin-bottom: 20px;
        }
        
        .section {
            margin-bottom: 25px;
            padding: 15px;
            border: 1px solid #ddd;
            background-color: #fafafa;
        }
        
        .section h2 {
            color: #2171b5;
            font-size: 16px;
            margin-top: 0;
            border-bottom: 1px solid #2171b5;
            padding-bottom: 5px;
        }
        
        /* Classic web elements */
        .blink {
            animation: blink-animation 1s steps(5, start) infinite;
        }
        
        @keyframes blink-animation {
            to { visibility: hidden; }
        }
        
        .marquee-container {
            background-color: #000080;
            color: #ffffff;
            padding: 5px;
            margin: 10px 0;
            overflow: hidden;
        }
        
        .under-construction {
            background-color: #ffff00;
            color: #ff0000;
            font-weight: bold;
            text-align: center;
            padding: 10px;
            border: 2px solid #ff0000;
            margin: 10px 0;
        }
        
        /* Footer */
        .footer {
            background-color: #e0e0e0;
            border-top: 2px solid #999;
            padding: 15px;
            text-align: center;
            font-size: 10px;
            color: #666;
        }
        
        /* Links styling */
        a {
            color: #0066cc;
        }
        
        a:visited {
            color: #663399;
        }
        
        /* Retro button styling */
        .retro-button {
            background-color: #e0e0e0;
            border: 2px outset #e0e0e0;
            padding: 5px 10px;
            cursor: pointer;
            font-size: 11px;
            margin: 5px;
        }
        
        .retro-button:hover {
            background-color: #d0d0d0;
        }
        
        .retro-button:active {
            border: 2px inset #e0e0e0;
        }
        
        /* Project showcase */
        .project-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            margin-top: 15px;
        }
        
        .project-card {
            border: 2px solid #999;
            background-color: #ffffff;
            padding: 10px;
            width: 200px;
            text-align: center;
        }
        
        .project-card img {
            width: 100%;
            max-width: 180px;
            height: 120px;
            border: 1px solid #ccc;
            background-color: #f0f0f0;
        }
        
        /* Animated GIF placeholder */
        .animated-gif {
            width: 80px;
            height: 15px;
            background: linear-gradient(45deg, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff);
            background-size: 400% 400%;
            animation: rainbow 2s ease infinite;
            margin: 10px auto;
            border: 1px solid #000;
        }
        
        @keyframes rainbow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
    </style>
</head>
<body>
    <!-- Main Table Layout (Classic early 2000s) -->
    <table class="main-table">
        <!-- Header Row -->
        <tr>
            <td colspan="2" class="header">
                <h1>🌟 John Developer's Homepage 🌟</h1>
                <div class="subtitle">Welcome to my corner of the World Wide Web!</div>
                <div class="visitor-counter">
                    Visitor #: <span id="visitor-count">001337</span>
                </div>
            </td>
        </tr>
        
        <!-- Navigation Row -->
        <tr>
            <td colspan="2" class="navbar">
                <table>
                    <tr>
                        <td class="nav-item active" onclick="showSection('home')">🏠 Home</td>
                        <td class="nav-item" onclick="showSection('about')">👨‍💻 About Me</td>
                        <td class="nav-item" onclick="showSection('projects')">💻 Projects</td>
                        <td class="nav-item" onclick="showSection('experience')">📋 Experience</td>
                        <td class="nav-item" onclick="showSection('contact')">📧 Contact</td>
                        <td class="nav-item" onclick="showSection('links')">🔗 Cool Links</td>
                        <td class="nav-item" onclick="showSection('guestbook')">📝 Guestbook</td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- Content Row -->
        <tr>
            <td class="sidebar">
                <!-- Sidebar Content -->
                <h3>📰 What's New!</h3>
                <div class="marquee-container">
                    <marquee behavior="scroll" direction="left" scrollamount="3">
                        🎉 Site updated with new projects! Check them out! 🎉
                    </marquee>
                </div>
                
                <h3>🎵 Now Playing</h3>
                <div style="background: #000; color: #00ff00; padding: 10px; font-family: monospace; font-size: 10px;">
                    ♪ Darude - Sandstorm ♪<br>
                    ████████░░ 80%
                </div>
                
                <h3>🔧 Site Tools</h3>
                <ul>
                    <li><a href="#" onclick="openApp('Notepad')">📝 Open Notepad</a></li>
                    <li><a href="#" onclick="openApp('Paint')">🎨 Open Paint</a></li>
                    <li><a href="#" onclick="openApp('Minesweeper')">💣 Play Minesweeper</a></li>
                    <li><a href="#" onclick="openApp('My Computer')">💻 My Computer</a></li>
                </ul>
                
                <h3>💫 Web Rings</h3>
                <ul>
                    <li><a href="#">Developer Ring</a></li>
                    <li><a href="#">Tech Enthusiasts</a></li>
                    <li><a href="#">Y2K Survivors</a></li>
                </ul>
                
                <div class="animated-gif"></div>
                
                <h3>📊 Site Stats</h3>
                <div style="font-size: 10px;">
                    <div>Pages: 42</div>
                    <div>Last Updated: <span id="last-updated"></span></div>
                    <div>Best viewed in:<br>IE 6.0+ 1024x768</div>
                </div>
            </td>
            
            <td class="main-content">
                <!-- Home Section -->
                <div id="home-section" class="content-section">
                    <div class="welcome-message">
                        <h2>🎊 Welcome to My Personal Homepage! 🎊</h2>
                        <p><strong>Greetings, fellow netizen!</strong> You've just entered the digital domain of John Developer, 
                        a passionate web developer and technology enthusiast from the year 2025 (but with a love for retro computing).</p>
                        
                        <p class="blink">★ NEW: Check out my latest React projects! ★</p>
                    </div>
                    
                    <div class="section">
                        <h2>🌐 About This Site</h2>
                        <p>This website showcases my journey as a software developer, featuring my projects, 
                        experience, and passion for creating digital experiences. Built with authentic early 2000s 
                        web design principles because sometimes the old ways are the best ways!</p>
                        
                        <p><strong>Site Features:</strong></p>
                        <ul>
                            <li>✅ Table-based layouts (like the pros used!)</li>
                            <li>✅ Authentic visitor counter</li>
                            <li>✅ Marquee text animations</li>
                            <li>✅ Integration with Windows XP apps</li>
                            <li>✅ Retro color schemes and fonts</li>
                        </ul>
                    </div>
                    
                    <div class="under-construction">
                        🚧 UNDER CONSTRUCTION 🚧<br>
                        Some sections are still being built. Check back soon!
                    </div>
                </div>
                
                <!-- About Section -->
                <div id="about-section" class="content-section" style="display: none;">
                    <div class="section">
                        <h2>👨‍💻 About John Developer</h2>
                        <p>Hello! I'm a full-stack developer with a passion for creating innovative web applications 
                        and user experiences. My journey in programming started in the golden age of the internet, 
                        and I've been coding ever since!</p>
                        
                        <h3>🛠️ Technical Skills</h3>
                        <ul>
                            <li><strong>Frontend:</strong> React, JavaScript, HTML5, CSS3, TypeScript</li>
                            <li><strong>Backend:</strong> Node.js, Python, Express, REST APIs</li>
                            <li><strong>Databases:</strong> MongoDB, PostgreSQL, MySQL</li>
                            <li><strong>Tools:</strong> Git, Docker, VS Code, Webpack</li>
                            <li><strong>Retro Skills:</strong> Windows XP, Internet Explorer 6, Flash (RIP)</li>
                        </ul>
                        
                        <h3>🎯 Current Focus</h3>
                        <p>Currently working on modern web applications while maintaining an appreciation 
                        for the design aesthetics and user experiences of the early internet era.</p>
                    </div>
                </div>
                
                <!-- Projects Section -->
                <div id="projects-section" class="content-section" style="display: none;">
                    <div class="section">
                        <h2>💻 Featured Projects</h2>
                        <p>Check out some of my recent work! Click the buttons below to open related apps.</p>
                        
                        <div class="project-grid">
                            <div class="project-card">
                                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='120' viewBox='0 0 180 120'%3E%3Crect width='180' height='120' fill='%23f0f0f0'/%3E%3Ctext x='90' y='60' text-anchor='middle' fill='%23666' font-family='Arial' font-size='12'%3EWindows XP Clone%3C/text%3E%3C/svg%3E" alt="Windows XP Project">
                                <h4>Windows XP Portfolio</h4>
                                <p>Authentic recreation of Windows XP interface in React</p>
                                <button class="retro-button" onclick="openApp('My Computer')">🗂️ View Details</button>
                            </div>
                            
                            <div class="project-card">
                                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='120' viewBox='0 0 180 120'%3E%3Crect width='180' height='120' fill='%23e0e0e0'/%3E%3Ctext x='90' y='60' text-anchor='middle' fill='%23333' font-family='Arial' font-size='12'%3EReact Dashboard%3C/text%3E%3C/svg%3E" alt="React Dashboard">
                                <h4>Modern Web Dashboard</h4>
                                <p>Full-stack React application with real-time data</p>
                                <button class="retro-button" onclick="openApp('Notepad')">📝 View Code</button>
                            </div>
                            
                            <div class="project-card">
                                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='120' viewBox='0 0 180 120'%3E%3Crect width='180' height='120' fill='%23ffffe0'/%3E%3Ctext x='90' y='60' text-anchor='middle' fill='%23666' font-family='Arial' font-size='12'%3EMobile App%3C/text%3E%3C/svg%3E" alt="Mobile App">
                                <h4>Mobile Game Collection</h4>
                                <p>Classic games recreated for modern devices</p>
                                <button class="retro-button" onclick="openApp('Minesweeper')">💣 Play Now</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Other sections -->
                <div id="experience-section" class="content-section" style="display: none;">
                    <div class="section">
                        <h2>📋 Professional Experience</h2>
                        <p>🚧 This section will showcase my professional journey and career highlights.</p>
                        <button class="retro-button" onclick="openApp('My Computer')">💼 Open Career Manager</button>
                    </div>
                </div>
                
                <div id="contact-section" class="content-section" style="display: none;">
                    <div class="section">
                        <h2>📧 Get In Touch</h2>
                        <p><strong>Email:</strong> john@developer.com</p>
                        <p><strong>Location:</strong> Silicon Valley, CA</p>
                        <p><strong>GitHub:</strong> <a href="#">github.com/johndeveloper</a></p>
                        <p><strong>LinkedIn:</strong> <a href="#">linkedin.com/in/johndeveloper</a></p>
                    </div>
                </div>
                
                <div id="links-section" class="content-section" style="display: none;">
                    <div class="section">
                        <h2>🔗 Cool Links & Resources</h2>
                        <ul>
                            <li><a href="#">W3Schools - Learn Web Development</a></li>
                            <li><a href="#">Mozilla Developer Network</a></li>
                            <li><a href="#">Stack Overflow</a></li>
                            <li><a href="#">GitHub</a></li>
                        </ul>
                    </div>
                </div>
                
                <div id="guestbook-section" class="content-section" style="display: none;">
                    <div class="section">
                        <h2>📝 Sign My Guestbook!</h2>
                        <p>Leave a message for other visitors to see!</p>
                        <div class="under-construction">
                            🚧 Guestbook feature coming soon! 🚧
                        </div>
                    </div>
                </div>
            </td>
        </tr>
        
        <!-- Footer Row -->
        <tr>
            <td colspan="2" class="footer">
                <p>&copy; 2025 John Developer's Homepage | Best viewed in Internet Explorer 6.0+ | 
                <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a></p>
                <p>This site is Y2K compliant! | Powered by HTML Tables & CSS | 
                Made with ❤️ and nostalgia</p>
                <div class="animated-gif" style="width: 200px;"></div>
            </td>
        </tr>
    </table>

    <script>
        // Early 2000s JavaScript functionality
        let visitorCount = 1337;
        
        // Initialize page
        document.addEventListener('DOMContentLoaded', function() {
            updateVisitorCount();
            updateLastUpdated();
        });
        
        // Navigation functionality
        function showSection(sectionName) {
            // Hide all sections
            const sections = document.querySelectorAll('.content-section');
            sections.forEach(section => section.style.display = 'none');
            
            // Show selected section
            document.getElementById(sectionName + '-section').style.display = 'block';
            
            // Update navigation active state
            const navItems = document.querySelectorAll('.nav-item');
            navItems.forEach(item => item.classList.remove('active'));
            event.target.classList.add('active');
        }
        
        // Visitor counter
        function updateVisitorCount() {
            visitorCount += Math.floor(Math.random() * 5) + 1;
            document.getElementById('visitor-count').textContent = 
                visitorCount.toString().padStart(6, '0');
        }
        
        // Last updated timestamp
        function updateLastUpdated() {
            const now = new Date();
            const dateStr = now.toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
            document.getElementById('last-updated').textContent = dateStr;
        }
        
        // Function to communicate with Windows XP apps
        function openApp(appName) {
            // Send message to parent React component
            window.parent.postMessage({
                type: 'OPEN_WINXP_APP',
                payload: appName
            }, '*');
        }
        
        // Auto-update visitor count every 30 seconds
        setInterval(updateVisitorCount, 30000);
        
        // Classic alert message
        function showWelcomeMessage() {
            alert("Welcome to my homepage! Please bookmark this page and tell your friends!");
        }
        
        // Easter egg: Konami code
        let konamiCode = [];
        const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
        
        document.addEventListener('keydown', function(e) {
            konamiCode.push(e.keyCode);
            if (konamiCode.length > konamiSequence.length) {
                konamiCode.shift();
            }
            if (konamiCode.join(',') === konamiSequence.join(',')) {
                alert("🎉 KONAMI CODE ACTIVATED! 🎉\\nYou found the secret!");
                document.body.style.animation = 'rainbow 1s ease infinite';
            }
        });
    </script>
</body>
</html>
    `;

    // Write HTML content to iframe
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(portfolioHTML);
    iframeDoc.close();

    // Listen for messages from iframe to handle app opening
    const handleMessage = event => {
      if (event.data.type === 'OPEN_WINXP_APP') {
        // onOpenApp?.(event.data.payload);
        if (typeof onOpenApp === 'function') {
          onOpenApp(event.data.payload);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onOpenApp]);

  return (
    <StyledPortfolio className={className}>
      <iframe
        ref={iframeRef}
        title="Portfolio"
        width="100%"
        height="100%"
        frameBorder="0"
        style={{
          border: 'none',
          background: '#ffffff',
        }}
      />
    </StyledPortfolio>
  );
};

const StyledPortfolio = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

export default Portfolio;
