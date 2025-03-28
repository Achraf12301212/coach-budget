document.addEventListener('DOMContentLoaded', () => {
    // Splash Screen
    const createSplashScreen = () => {
        const splash = document.createElement('div');
        splash.classList.add('splash-screen');
        
        // Create logo SVG with enhanced drawing animation
        const logoSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        logoSvg.setAttribute("width", "150");
        logoSvg.setAttribute("height", "150");
        logoSvg.setAttribute("viewBox", "0 0 40 40");
        logoSvg.setAttribute("fill", "none");
        logoSvg.classList.add('splash-logo');
        
        logoSvg.innerHTML = `
            <circle cx="20" cy="20" r="18" fill="#2E7D32" stroke="white" stroke-width="2" opacity="0.9" />
            <path d="M15 20C15 16.13 18.13 13 22 13C25.87 13 29 16.13 29 20C29 23.87 25.87 27 22 27" stroke="white" stroke-width="2.5" />
            <path d="M22 27H11" stroke="white" stroke-width="2.5" />
            <path d="M22 23L25 20L22 17" stroke="white" stroke-width="2.5" />
        `;
        
        // Create brand name with animation
        const brandName = document.createElement('div');
        brandName.classList.add('splash-name');
        brandName.textContent = 'Coach Budget';
        
        // Create tagline with animation
        const tagline = document.createElement('div');
        tagline.classList.add('splash-tagline');
        tagline.textContent = 'Prenez le contrôle de vos finances';
        
        // Create particle container for visual effects
        const particleContainer = document.createElement('div');
        particleContainer.classList.add('particle-container');
        
        // Create particles
        for (let i = 0; i < 30; i++) {
            createParticle(particleContainer);
        }
        
        splash.appendChild(particleContainer);
        splash.appendChild(logoSvg);
        splash.appendChild(brandName);
        splash.appendChild(tagline);
        document.body.appendChild(splash);
        
        // Create startup sound but don't play it automatically
        const startupSound = new Audio('https://cdn.freesound.org/previews/320/320655_5260872-lq.mp3');
        startupSound.volume = 0.4;
        
        // Play sound only after first user interaction
        const playStartupSound = () => {
            startupSound.play().catch(e => console.log("Audio play failed:", e));
            document.removeEventListener('click', playStartupSound);
        };
        document.addEventListener('click', playStartupSound);
        
        // Hide splash screen after animation
        setTimeout(() => {
            splash.classList.add('hidden');
            setTimeout(() => {
                splash.remove();
            }, 500);
        }, 3500);
    };
    
    // Create animated particles
    const createParticle = (container) => {
        const particle = document.createElement('div');
        particle.classList.add('splash-particle');
        
        const size = Math.random() * 15 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        
        particle.style.left = `${startX}px`;
        particle.style.top = `${startY}px`;
        particle.style.opacity = Math.random() * 0.6 + 0.2;
        
        container.appendChild(particle);
        
        // Animate each particle
        gsap.to(particle, {
            x: Math.random() * 200 - 100,
            y: Math.random() * 200 - 100,
            scale: Math.random() * 2 + 0.5,
            opacity: 0,
            duration: Math.random() * 3 + 2,
            ease: "power1.out",
            onComplete: () => {
                particle.remove();
                createParticle(container);
            }
        });
    };
    
    // Run splash screen
    createSplashScreen();
    
    // Mobile Navigation
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // Cookie Banner
    setTimeout(() => {
        const cookieBanner = document.getElementById('cookie-banner');
        if (cookieBanner) { 
            cookieBanner.classList.add('active');
            
            document.getElementById('accept-cookies')?.addEventListener('click', () => {
                cookieBanner.classList.remove('active');
                localStorage.setItem('cookiesAccepted', 'true');
            });
            
            document.getElementById('decline-cookies')?.addEventListener('click', () => {
                cookieBanner.classList.remove('active');
            });
        }
    }, 2000);

    // Background Animation in Hero Section
    const backgroundAnimation = document.querySelector('.background-animation');
    
    // Create SVG Financial Graph Background
    const createGraphBackground = () => {
        const graphSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        graphSvg.setAttribute("width", "100%");
        graphSvg.setAttribute("height", "100%");
        
        // Create random financial graph lines
        for (let i = 0; i < 8; i++) {
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            
            let pathData = `M0,${Math.random() * 100 + 50}`;
            for (let j = 1; j < 10; j++) {
                pathData += ` L${j * 10}%,${Math.random() * 100 + 50}`;
            }
            
            path.setAttribute("d", pathData);
            path.setAttribute("fill", "none");
            path.setAttribute("stroke", "white");
            path.setAttribute("stroke-width", "2");
            path.setAttribute("opacity", "0.4");
            
            graphSvg.appendChild(path);
        }
        
        // Add some circles to represent data points
        for (let i = 0; i < 20; i++) {
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("cx", `${Math.random() * 100}%`);
            circle.setAttribute("cy", `${Math.random() * 100}%`);
            circle.setAttribute("r", Math.random() * 4 + 2);
            circle.setAttribute("fill", "white");
            circle.setAttribute("opacity", "0.4");
            
            graphSvg.appendChild(circle);
        }
        
        backgroundAnimation.appendChild(graphSvg);
        
        // Animate the graph with GSAP
        gsap.to(graphSvg.querySelectorAll("path"), {
            strokeDashoffset: 0,
            strokeDasharray: 1000,
            duration: 20,
            repeat: -1,
            yoyo: true,
            stagger: 0.5,
            ease: "power1.inOut"
        });
        
        gsap.to(graphSvg.querySelectorAll("circle"), {
            scale: 1.5,
            opacity: 0.2,
            duration: 3,
            repeat: -1,
            yoyo: true,
            stagger: 0.2,
            ease: "sine.inOut"
        });
    };
    
    createGraphBackground();

    // Hero App Illustration
    const createAppIllustration = () => {
        const svg = d3.select("#hero-app-illustration");
        
        // Create smartphone mockup
        svg.append("rect")
            .attr("x", 150)
            .attr("y", 50)
            .attr("width", 200)
            .attr("height", 400)
            .attr("rx", 20)
            .attr("ry", 20)
            .attr("fill", "#fff")
            .attr("stroke", "#ddd")
            .attr("stroke-width", 2);
        
        // Screen
        svg.append("rect")
            .attr("x", 160)
            .attr("y", 70)
            .attr("width", 180)
            .attr("height", 360)
            .attr("rx", 5)
            .attr("ry", 5)
            .attr("fill", "#f5f7fa");
        
        // App header
        svg.append("rect")
            .attr("x", 160)
            .attr("y", 70)
            .attr("width", 180)
            .attr("height", 50)
            .attr("fill", "#1976D2");
        
        // App title
        svg.append("text")
            .attr("x", 250)
            .attr("y", 100)
            .attr("text-anchor", "middle")
            .attr("fill", "white")
            .attr("font-weight", "bold")
            .text("Coach Budget");
        
        // Budget circle
        svg.append("circle")
            .attr("cx", 250)
            .attr("cy", 180)
            .attr("r", 60)
            .attr("fill", "none")
            .attr("stroke", "#2E7D32")
            .attr("stroke-width", 8);
        
        svg.append("text")
            .attr("x", 250)
            .attr("y", 170)
            .attr("text-anchor", "middle")
            .attr("fill", "#333")
            .attr("font-size", "12px")
            .text("BUDGET MENSUEL");
        
        svg.append("text")
            .attr("x", 250)
            .attr("y", 195)
            .attr("text-anchor", "middle")
            .attr("fill", "#2E7D32")
            .attr("font-size", "22px")
            .attr("font-weight", "bold")
            .text("1250 DH");
        
        // Expense bars
        const categories = ["Loyer", "Nourriture", "Transport", "Loisirs"];
        const colors = ["#1976D2", "#2E7D32", "#FF9800", "#9C27B0"];
        
        categories.forEach((cat, i) => {
            const y = 270 + i * 35;
            
            // Category label
            svg.append("text")
                .attr("x", 175)
                .attr("y", y + 5)
                .attr("fill", "#333")
                .attr("font-size", "10px")
                .text(cat);
            
            // Background bar
            svg.append("rect")
                .attr("x", 175)
                .attr("y", y + 10)
                .attr("width", 150)
                .attr("height", 10)
                .attr("rx", 5)
                .attr("ry", 5)
                .attr("fill", "#eee");
            
            // Progress bar
            const width = Math.random() * 120 + 30;
            svg.append("rect")
                .attr("x", 175)
                .attr("y", y + 10)
                .attr("width", width)
                .attr("height", 10)
                .attr("rx", 5)
                .attr("ry", 5)
                .attr("fill", colors[i]);
            
            // Amount
            svg.append("text")
                .attr("x", 335)
                .attr("y", y + 5)
                .attr("text-anchor", "end")
                .attr("fill", "#333")
                .attr("font-size", "10px")
                .text(`${Math.floor(width * 3)} DH`);
        });
        
        // Animate elements
        gsap.from("#hero-app-illustration rect, #hero-app-illustration circle", {
            scale: 0.9,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "back.out(1.7)"
        });
    };
    
    createAppIllustration();

    // Enhanced Feature Icons with detailed visualizations
    const createFeatureIcons = () => {
        // Real-time expense analysis
        const realtimeAnalysis = document.getElementById("realtime-analysis");
        const analysisSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        analysisSvg.setAttribute("width", "80");
        analysisSvg.setAttribute("height", "80");
        analysisSvg.setAttribute("viewBox", "0 0 80 80");
        
        // Wallet icon with moving coins
        analysisSvg.innerHTML = `
            <rect x="10" y="20" width="50" height="40" rx="5" fill="#1976D2" />
            <rect x="10" y="20" width="50" height="10" rx="5" fill="#0D47A1" />
            <circle class="coin" cx="25" cy="35" r="8" fill="#FFD700" />
            <circle class="coin" cx="45" cy="40" r="8" fill="#FFD700" />
            <rect x="17" y="60" width="36" height="4" rx="2" fill="#333" />
            <path d="M25 27 L55 27" stroke="#fff" stroke-width="2" />
            <path class="arrow-in" d="M65 35 L75 35 L70 30" fill="none" stroke="#2E7D32" stroke-width="2" />
            <path class="arrow-out" d="M65 45 L75 45 L70 50" fill="none" stroke="#F44336" stroke-width="2" />
        `;
        
        realtimeAnalysis.appendChild(analysisSvg);
        
        gsap.to(analysisSvg.querySelectorAll(".coin"), {
            y: -10,
            duration: 1,
            repeat: -1,
            yoyo: true,
            stagger: 0.2,
            ease: "power1.inOut"
        });
        
        gsap.to(analysisSvg.querySelector(".arrow-in"), {
            x: -10,
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });
        
        gsap.to(analysisSvg.querySelector(".arrow-out"), {
            x: -10,
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            delay: 0.5
        });
        
        // Create expanded details for each feature
        createAnalysisDetails();
        createSavingsDetails();
        createAdviceDetails();
        createAlertDetails();
    };
    
    // Real-time expense analysis expanded details
    const createAnalysisDetails = () => {
        const container = document.getElementById('analysis-details');
        
        // Create detail items
        const details = [
            {icon: 'fas fa-robot', text: 'Catégorisation automatique par IA'},
            {icon: 'fas fa-chart-line', text: 'Graphiques dynamiques et interactifs'},
            {icon: 'fas fa-history', text: 'Comparaison avec les mois précédents'},
            {icon: 'fas fa-exclamation-triangle', text: 'Détection de dépenses inhabituelles'},
            {icon: 'fas fa-piggy-bank', text: 'Suggestions d\'économies personnalisées'}
        ];
        
        // Add detail items
        details.forEach((detail, index) => {
            const detailItem = document.createElement('div');
            detailItem.className = 'feature-detail-item';
            detailItem.style.transitionDelay = `${index * 0.1}s`;
            
            detailItem.innerHTML = `
                <div class="feature-detail-icon">
                    <i class="${detail.icon}"></i>
                </div>
                <div class="feature-detail-text">${detail.text}</div>
            `;
            
            container.appendChild(detailItem);
        });
        
        // Add interactive chart visualization
        const chartContainer = document.createElement('div');
        chartContainer.className = 'chart-container';
        container.appendChild(chartContainer);
        
        // Create expense chart with D3
        const margin = {top: 20, right: 20, bottom: 30, left: 40};
        const width = chartContainer.clientWidth - margin.left - margin.right;
        const height = chartContainer.clientHeight - margin.top - margin.bottom;
        
        const svg = d3.select(chartContainer)
            .append('svg')
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);
        
        // Sample data
        const data = [
            {category: 'Loyer', amount: 650, color: '#1976D2'},
            {category: 'Nourriture', amount: 350, color: '#FF9800'},
            {category: 'Transport', amount: 200, color: '#9C27B0'},
            {category: 'Loisirs', amount: 150, color: '#2E7D32'},
            {category: 'Autres', amount: 100, color: '#607D8B'}
        ];
        
        // X scale
        const x = d3.scaleBand()
            .domain(data.map(d => d.category))
            .range([0, width])
            .padding(0.3);
        
        // Y scale
        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.amount)])
            .range([height, 0]);
        
        // Add bars with animation
        svg.selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', d => x(d.category))
            .attr('width', x.bandwidth())
            .attr('fill', d => d.color)
            .attr('y', height)
            .attr('height', 0)
            .transition()
            .duration(1000)
            .delay((d, i) => i * 100)
            .attr('y', d => y(d.amount))
            .attr('height', d => height - y(d.amount));
        
        // Add values on top of bars
        svg.selectAll('.label')
            .data(data)
            .enter()
            .append('text')
            .attr('class', 'label')
            .attr('text-anchor', 'middle')
            .attr('x', d => x(d.category) + x.bandwidth() / 2)
            .attr('y', d => y(d.amount) - 5)
            .attr('font-size', '9px')
            .attr('fill', '#333')
            .text(d => `${d.amount} DH`)
            .attr('opacity', 0)
            .transition()
            .duration(1000)
            .delay((d, i) => 500 + i * 100)
            .attr('opacity', 1);
        
        // X axis
        svg.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x))
            .selectAll('text')
            .attr('font-size', '8px')
            .attr('transform', 'rotate(-45)')
            .style('text-anchor', 'end');
    };
    
    // Micro-savings expanded details
    const createSavingsDetails = () => {
        const container = document.getElementById('savings-details');
        
        // Create detail items
        const details = [
            {icon: 'fas fa-bullseye', text: 'Définition d\'objectifs personnalisés'},
            {icon: 'fas fa-coins', text: 'Arrondissement des achats automatique'},
            {icon: 'fas fa-percentage', text: 'Épargne d\'un % de chaque revenu'},
            {icon: 'fas fa-trophy', text: 'Gamification et suivi des progrès'},
            {icon: 'fas fa-chart-line', text: 'Projection des gains futurs'}
        ];
        
        // Add detail items
        details.forEach((detail, index) => {
            const detailItem = document.createElement('div');
            detailItem.className = 'feature-detail-item';
            detailItem.style.transitionDelay = `${index * 0.1}s`;
            
            detailItem.innerHTML = `
                <div class="feature-detail-icon">
                    <i class="${detail.icon}"></i>
                </div>
                <div class="feature-detail-text">${detail.text}</div>
            `;
            
            container.appendChild(detailItem);
        });
        
        // Add savings goal visualization
        const savingsContainer = document.createElement('div');
        savingsContainer.className = 'savings-goal-container';
        container.appendChild(savingsContainer);
        
        const savingsSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        savingsSvg.setAttribute("width", "100%");
        savingsSvg.setAttribute("height", "100%");
        savingsSvg.setAttribute("viewBox", "0 0 300 100");
        
        savingsSvg.innerHTML = `
            <defs>
                <linearGradient id="goalProgress" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#2E7D32"/>
                    <stop offset="100%" stop-color="#81C784"/>
                </linearGradient>
            </defs>
            
            <text x="10" y="20" fill="#666" font-size="10">Objectif: Voyage - 5000 DH</text>
            
            <!-- Progress bar background -->
            <rect x="10" y="40" width="280" height="20" rx="10" fill="#E0E0E0"/>
            
            <!-- Progress bar fill (animated) -->
            <rect class="progress-fill" x="10" y="40" width="0" height="20" rx="10" fill="url(#goalProgress)"/>
            
            <!-- Progress text -->
            <text x="150" y="55" text-anchor="middle" fill="white" font-size="12" font-weight="bold">0 / 5000 DH</text>
            
            <!-- Days left -->
            <text x="10" y="80" fill="#666" font-size="10">Temps restant: 120 jours</text>
            
            <!-- Daily amount needed -->
            <text x="290" y="80" text-anchor="end" fill="#666" font-size="10">15 DH/jour</text>
            
            <!-- Micro-savings visualization -->
            <g class="coin-group"></g>
        `;
        
        savingsContainer.appendChild(savingsSvg);
        
        // Animate progress bar
        const progressBar = savingsSvg.querySelector('.progress-fill');
        const progressText = savingsSvg.querySelector('text[text-anchor="middle"]');
        
        // Current progress: 1800 DH out of 5000 DH (36%)
        gsap.to(progressBar, {
            attr: { width: 280 * 0.36 },
            duration: 1.5,
            ease: "power2.out",
            onUpdate: function() {
                const progress = Math.round(gsap.getProperty(progressBar, "attr", "width") / 280 * 5000);
                progressText.textContent = `${progress} / 5000 DH`;
            }
        });
        
        // Add animated coins falling effect
        const coinGroup = savingsSvg.querySelector('.coin-group');
        
        // Create falling coins animation
        for (let i = 0; i < 5; i++) {
            const coin = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            coin.setAttribute("r", "5");
            coin.setAttribute("fill", "#FFD700");
            coin.setAttribute("stroke", "#E6C200");
            coin.setAttribute("stroke-width", "1");
            coin.setAttribute("cx", 150 + (i - 2) * 30);
            coin.setAttribute("cy", -10);
            
            coinGroup.appendChild(coin);
            
            // Animate coin falling
            gsap.to(coin, {
                attr: { cy: 110 },
                duration: 1 + Math.random() * 0.5,
                delay: i * 0.2,
                repeat: -1,
                repeatDelay: 1,
                ease: "bounce.out"
            });
        }
    };
    
    // Personalized advice expanded details
    const createAdviceDetails = () => {
        const container = document.getElementById('advice-details');
        
        // Create detail items
        const details = [
            {icon: 'fas fa-robot', text: 'Assistant virtuel intelligent'},
            {icon: 'fas fa-file-alt', text: 'Rapport financier mensuel'},
            {icon: 'fas fa-tasks', text: 'Plan d\'action sur mesure'},
            {icon: 'fas fa-graduation-cap', text: 'Contenus éducatifs adaptés'},
            {icon: 'fas fa-bell', text: 'Alertes opportunités financières'}
        ];
        
        // Add detail items
        details.forEach((detail, index) => {
            const detailItem = document.createElement('div');
            detailItem.className = 'feature-detail-item';
            detailItem.style.transitionDelay = `${index * 0.1}s`;
            
            detailItem.innerHTML = `
                <div class="feature-detail-icon">
                    <i class="${detail.icon}"></i>
                </div>
                <div class="feature-detail-text">${detail.text}</div>
            `;
            
            container.appendChild(detailItem);
        });
        
        // Add advice visualization
        const adviceContainer = document.createElement('div');
        adviceContainer.className = 'advice-container';
        container.appendChild(adviceContainer);
        
        const adviceSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        adviceSvg.setAttribute("width", "100%");
        adviceSvg.setAttribute("height", "100%");
        adviceSvg.setAttribute("viewBox", "0 0 300 100");
        
        adviceSvg.innerHTML = `
            <!-- Chat bubbles with animation -->
            <g class="chat-animation">
                <!-- Assistant bubble -->
                <rect x="10" y="10" width="200" height="35" rx="15" fill="#E3F2FD" class="chat-bubble assistant-bubble"/>
                <path d="M10 30 L5 40 L15 35" fill="#E3F2FD" class="chat-bubble-tip"/>
                <text x="20" y="30" fill="#333" font-size="10" class="chat-text">Conseils: Réduisez vos abonnements pour économiser 120 DH/mois</text>
                
                <!-- User bubble -->
                <rect x="90" y="55" width="200" height="35" rx="15" fill="#1976D2" class="chat-bubble user-bubble"/>
                <path d="M290 75 L295 85 L285 80" fill="#1976D2" class="chat-bubble-tip-right"/>
                <text x="100" y="75" fill="white" font-size="10" class="chat-text">Comment puis-je atteindre mon objectif d'épargne plus rapidement ?</text>
            </g>
            
            <!-- Assistant icon -->
            <circle cx="25" cy="85" r="15" fill="#2E7D32" class="assistant-icon"/>
            <text x="25" y="90" text-anchor="middle" fill="white" font-size="14">AI</text>
        `;
        
        adviceContainer.appendChild(adviceSvg);
        
        // Animate chat bubbles
        const assistantBubble = adviceSvg.querySelector('.assistant-bubble');
        const assistantTip = adviceSvg.querySelector('.chat-bubble-tip');
        const userBubble = adviceSvg.querySelector('.user-bubble');
        const userTip = adviceSvg.querySelector('.chat-bubble-tip-right');
        const assistantText = adviceSvg.querySelector('text[y="30"]');
        const userText = adviceSvg.querySelector('text[y="75"]');
        
        // Initial state
        gsap.set([assistantBubble, assistantTip, assistantText], { opacity: 0, x: -20 });
        gsap.set([userBubble, userTip, userText], { opacity: 0, x: 20 });
        
        // Animation sequence
        const chatTimeline = gsap.timeline({ repeat: -1, repeatDelay: 1 });
        
        chatTimeline.to([assistantBubble, assistantTip, assistantText], {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.1
        })
        .to([userBubble, userTip, userText], {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.1
        }, "+=1")
        .to([assistantBubble, assistantTip, assistantText, userBubble, userTip, userText], {
            opacity: 0,
            duration: 0.5,
            delay: 2
        });
        
        // Animate assistant icon
        gsap.to(adviceSvg.querySelector('.assistant-icon'), {
            scale: 1.1,
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    };
    
    // Budget alerts expanded details
    const createAlertDetails = () => {
        const container = document.getElementById('alerts-details');
        
        // Create detail items
        const details = [
            {icon: 'fas fa-exclamation-circle', text: 'Détection des dépassements de budget'},
            {icon: 'fas fa-search-dollar', text: 'Prévision des risques de découvert'},
            {icon: 'fas fa-sliders-h', text: 'Personnalisation des alertes'},
            {icon: 'fas fa-lock', text: 'Mode "Dépenses limitées"'},
            {icon: 'fas fa-lightbulb', text: 'Recommandations immédiates'}
        ];
        
        // Add detail items
        details.forEach((detail, index) => {
            const detailItem = document.createElement('div');
            detailItem.className = 'feature-detail-item';
            detailItem.style.transitionDelay = `${index * 0.1}s`;
            
            detailItem.innerHTML = `
                <div class="feature-detail-icon">
                    <i class="${detail.icon}"></i>
                </div>
                <div class="feature-detail-text">${detail.text}</div>
            `;
            
            container.appendChild(detailItem);
        });
        
        // Add alert visualization
        const alertContainer = document.createElement('div');
        alertContainer.className = 'alert-container';
        container.appendChild(alertContainer);
        
        const alertSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        alertSvg.setAttribute("width", "100%");
        alertSvg.setAttribute("height", "100%");
        alertSvg.setAttribute("viewBox", "0 0 300 100");
        
        alertSvg.innerHTML = `
            <defs>
                <filter id="glow-budget" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2" result="blur"/>
                    <feFlood flood-color="#F44336" flood-opacity="0.5" result="color"/>
                    <feComposite in="color" in2="blur" operator="in" result="glow"/>
                    <feComposite in="SourceGraphic" in2="glow" operator="over"/>
                </filter>
            </defs>
            
            <!-- Budget meter -->
            <rect x="10" y="10" width="280" height="25" rx="12.5" fill="#EEEEEE" class="budget-meter-bg"/>
            
            <!-- Warning zone -->
            <rect x="220" y="10" width="70" height="25" rx="0" fill="#FFEBEE" class="warning-zone"/>
            
            <!-- Budget progress -->
            <rect x="10" y="10" width="0" height="25" rx="12.5" fill="#4CAF50" class="budget-progress"/>
            
            <!-- Warning indicator -->
            <circle cx="220" cy="22.5" r="12.5" fill="#F44336" class="warning-indicator" filter="url(#glow-budget)" opacity="0"/>
            
            <!-- Category info -->
            <text x="20" y="27" fill="#666" font-size="12">Restaurants: 650 / 700 DH</text>
            
            <!-- Alert notification -->
            <g class="alert-notification" opacity="0">
                <rect x="60" y="45" width="180" height="45" rx="5" fill="#F44336"/>
                <text x="150" y="65" text-anchor="middle" fill="white" font-size="10" font-weight="bold">ALERTE BUDGET</text>
                <text x="150" y="80" text-anchor="middle" fill="white" font-size="9">Restaurants: 93% du budget utilisé</text>
            </g>
            
            <!-- Warning symbols -->
            <g class="warning-symbols"></g>
        `;
        
        alertContainer.appendChild(alertSvg);
        
        // Animate budget progress bar
        const budgetProgress = alertSvg.querySelector('.budget-progress');
        const warningIndicator = alertSvg.querySelector('.warning-indicator');
        const alertNotification = alertSvg.querySelector('.alert-notification');
        
        gsap.to(budgetProgress, {
            attr: { width: 230 },
            duration: 2,
            ease: "power1.inOut",
            onComplete: () => {
                // Show warning indicator
                gsap.to(warningIndicator, {
                    opacity: 1,
                    scale: 1.2,
                    duration: 0.5,
                    repeat: 3,
                    yoyo: true,
                    ease: "sine.inOut",
                    onComplete: () => {
                        // Show alert notification
                        gsap.to(alertNotification, {
                            opacity: 1,
                            y: -5,
                            duration: 0.5,
                            ease: "back.out(1.7)"
                        });
                    }
                });
            }
        });
        
        // Add animated warning symbols
        const warningSymbols = alertSvg.querySelector('.warning-symbols');
        
        for (let i = 0; i < 3; i++) {
            const symbol = document.createElementNS("http://www.w3.org/2000/svg", "path");
            symbol.setAttribute("d", "M0,0 L10,0 L5,8 Z");
            symbol.setAttribute("fill", "#F44336");
            symbol.setAttribute("opacity", "0.6");
            symbol.setAttribute("transform", `translate(${50 + i * 100}, 40) scale(0)`);
            
            warningSymbols.appendChild(symbol);
            
            // Animate warning symbols
            gsap.to(symbol, {
                scale: 1,
                rotation: 360,
                duration: 0.5,
                delay: 2.5 + i * 0.2,
                ease: "back.out(1.7)"
            });
        }
    };
    
    createFeatureIcons();

    // Load background images for blog posts with SVG patterns instead of images
    const loadBlogImages = () => {
        const blogImages = [
            { 
                element: document.querySelector('.blog-card:nth-child(1) .blog-image'),
                pattern: `<svg width="100%" height="100%" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="savings-pattern" patternUnits="userSpaceOnUse" width="20" height="20" viewBox="0 0 10 10">
                            <circle cx="5" cy="5" r="2" fill="${document.documentElement.classList.contains('dark-mode') ? '#4CAF50' : '#81C784'}" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="${document.documentElement.classList.contains('dark-mode') ? '#1E4620' : '#E8F5E9'}" />
                    <rect width="100%" height="100%" fill="url(#savings-pattern)" opacity="0.3" />
                    <text x="50%" y="50%" text-anchor="middle" font-size="24" font-weight="bold" fill="${document.documentElement.classList.contains('dark-mode') ? '#E0E0E0' : '#2E7D32'}">Épargne</text>
                </svg>`
            },
            { 
                element: document.querySelector('.blog-card:nth-child(2) .blog-image'),
                pattern: `<svg width="100%" height="100%" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="investment-pattern" patternUnits="userSpaceOnUse" width="20" height="20" viewBox="0 0 10 10">
                            <path d="M0,5 L10,5 M5,0 L5,10" stroke="${document.documentElement.classList.contains('dark-mode') ? '#90CAF9' : '#1976D2'}" stroke-width="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="${document.documentElement.classList.contains('dark-mode') ? '#0A2642' : '#E3F2FD'}" />
                    <rect width="100%" height="100%" fill="url(#investment-pattern)" opacity="0.3" />
                    <text x="50%" y="50%" text-anchor="middle" font-size="24" font-weight="bold" fill="${document.documentElement.classList.contains('dark-mode') ? '#E0E0E0' : '#1976D2'}">Investissement</text>
                </svg>`
            },
            { 
                element: document.querySelector('.blog-card:nth-child(3) .blog-image'),
                pattern: `<svg width="100%" height="100%" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="webinar-pattern" patternUnits="userSpaceOnUse" width="20" height="20" viewBox="0 0 10 10">
                            <rect x="4" y="4" width="2" height="2" fill="${document.documentElement.classList.contains('dark-mode') ? '#FFB74D' : '#FF9800'}" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="${document.documentElement.classList.contains('dark-mode') ? '#4E342E' : '#FFF3E0'}" />
                    <rect width="100%" height="100%" fill="url(#webinar-pattern)" opacity="0.3" />
                    <text x="50%" y="50%" text-anchor="middle" font-size="24" font-weight="bold" fill="${document.documentElement.classList.contains('dark-mode') ? '#E0E0E0' : '#E65100'}">Webinaire</text>
                </svg>`
            }
        ];
        
        blogImages.forEach(image => {
            if (image.element) {
                image.element.innerHTML = image.pattern;
            }
        });
    };
    
    loadBlogImages();

    // Add button ripple effect
    const buttons = document.querySelectorAll('.cta-button, .pricing-button, #accept-cookies, #decline-cookies');
    
    buttons.forEach(button => {
        button.addEventListener('mousedown', function(e) {
            const x = e.clientX - this.getBoundingClientRect().left;
            const y = e.clientY - this.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add parallax effect to the hero section
    const heroSection = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
            heroSection.querySelector('.background-animation').style.transform = `translateY(${scrollY * 0.1}px)`;
        }
    });

    // Add animations to elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .pricing-card, .blog-card, .coaching-info > div');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    };

    // Add CSS for the animations
    const addAnimationStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .animate-in {
                animation: fadeInUp 0.6s ease forwards;
            }
            
            .ripple-effect {
                position: absolute;
                background: rgba(255, 255, 255, 0.4);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            }
            
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            .feature-card, .pricing-card, .blog-card, .coaching-info > div {
                opacity: 0;
            }
        `;
        document.head.appendChild(style);
    };
    
    addAnimationStyles();
    animateOnScroll();

    // Create testimonials with realistic user comments
    const createTestimonials = () => {
        const testimonials = [
            {
                name: "Mohammed Aber",
                avatar: "#1976D2",
                rating: 5,
                text: "MA sit ma ta l3ba! J'ai économisé plus en 3 mois qu'en 2 ans. L'application est simple et les conseils sont vraiment utiles."
            },
            {
                name: "Chwiba",
                avatar: "#FF9800",
                rating: 5,
                text: "Tl3 tl3 asahbi! Cette app a changé ma façon de gérer mon argent. Le conseiller virtuel propose des solutions adaptées à ma situation."
            },
            // Add more testimonials as needed
        ];
        
        // Generate testimonial cards and add them to the container
        const container = document.getElementById('testimonial-container');
        
        testimonials.forEach((testimonial, index) => {
            const testimonialCard = document.createElement('div');
            testimonialCard.className = 'testimonial';
            testimonialCard.style.display = index === 0 ? 'block' : 'none';
            
            testimonialCard.innerHTML = `
                <div class="testimonial-header">
                    <div class="testimonial-avatar" style="background-color: ${testimonial.avatar}">
                        ${testimonial.name.charAt(0)}
                    </div>
                    <div class="testimonial-info">
                        <h4>${testimonial.name}</h4>
                        <div class="rating">
                            ${Array(5).fill().map((_, i) => 
                                `<i class="fas fa-star${i >= testimonial.rating ? '-o' : ''}"></i>`
                            ).join('')}
                        </div>
                    </div>
                </div>
                <p class="testimonial-text">${testimonial.text}</p>
                <svg class="testimonial-decoration" width="60" height="60" viewBox="0 0 100 100">
                    <path class="testimonial-quotes" d="M20,20 Q40,5 50,20 T80,20 Q95,40 80,50 T80,80 Q60,95 50,80 T20,80 Q5,60 20,50 T20,20" fill="none" stroke="currentColor" stroke-width="5"></path>
                </svg>
            `;
            
            container.appendChild(testimonialCard);
        });
        
        // Add slider functionality
        let currentTestimonial = 0;
        const testimonialElements = container.querySelectorAll('.testimonial');
        const totalTestimonials = testimonialElements.length;
        
        document.getElementById('next-testimonial').addEventListener('click', () => {
            testimonialElements[currentTestimonial].style.display = 'none';
            currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
            testimonialElements[currentTestimonial].style.display = 'block';
            
            // Add animation
            gsap.from(testimonialElements[currentTestimonial], {
                x: 100,
                opacity: 0,
                duration: 0.5,
                ease: "power2.out"
            });
        });
        
        document.getElementById('prev-testimonial').addEventListener('click', () => {
            testimonialElements[currentTestimonial].style.display = 'none';
            currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
            testimonialElements[currentTestimonial].style.display = 'block';
            
            // Add animation
            gsap.from(testimonialElements[currentTestimonial], {
                x: -100,
                opacity: 0,
                duration: 0.5,
                ease: "power2.out"
            });
        });
    };
    
    createTestimonials();

    // Make feature cards clickable to show details
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('click', function() {
            // Toggle the details container height
            const detailsContainer = this.querySelector('.feature-details-container');
            
            if (detailsContainer) {
                // If it's already expanded
                if (detailsContainer.style.height && detailsContainer.style.height !== '0px') {
                    detailsContainer.style.height = '0px';
                    this.classList.remove('expanded');
                } else {
                    // Find current height of content
                    detailsContainer.style.height = 'auto';
                    const height = detailsContainer.scrollHeight + 'px';
                    detailsContainer.style.height = '0px';
                    
                    // Trigger reflow
                    void detailsContainer.offsetHeight;
                    
                    // Set height to actual content height
                    detailsContainer.style.height = height;
                    this.classList.add('expanded');
                }
            }
        });
    });

    // Registration Form Modal
    const createRegistrationModal = () => {
        const modal = document.createElement('div');
        modal.classList.add('registration-modal');
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h3>Commencez votre essai gratuit</h3>
                <form id="registration-form">
                    <div class="form-group">
                        <label for="fullname">Nom complet</label>
                        <input type="text" id="fullname" name="fullname" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Mot de passe</label>
                        <input type="password" id="password" name="password" required>
                    </div>
                    <div class="form-group">
                        <label for="phone">Téléphone</label>
                        <input type="tel" id="phone" name="phone">
                    </div>
                    <div class="form-check">
                        <input type="checkbox" id="terms" name="terms" required>
                        <label for="terms">J'accepte les <a href="#">conditions d'utilisation</a></label>
                    </div>
                    <button type="submit" class="submit-button">Créer mon compte</button>
                </form>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal when clicking on X or outside the modal
        const closeModal = document.querySelector('.close-modal');
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
        
        // Form submission
        const registrationForm = document.getElementById('registration-form');
        registrationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Hide the modal
            modal.classList.remove('active');
            
            // Create welcome message
            const welcomeMessage = document.createElement('div');
            welcomeMessage.classList.add('welcome-message');
            welcomeMessage.innerHTML = `
                <div class="welcome-content">
                    <h3>Bienvenue chez Coach Budget!</h3>
                    <p>Merci de vous être inscrit, ${document.getElementById('fullname').value}!</p>
                    <p>Nous sommes ravis de vous accompagner dans votre parcours financier.</p>
                    <button class="close-welcome">Commencer</button>
                </div>
            `;
            
            document.body.appendChild(welcomeMessage);
            
            // Play welcome sound with error handling
            const welcomeSound = new Audio('https://cdn.freesound.org/previews/221/221683_1015240-lq.mp3');
            welcomeSound.volume = 0.3;
            welcomeSound.play().catch(e => console.log("Welcome sound play failed:", e));
            
            // Show the welcome message with animation
            setTimeout(() => {
                welcomeMessage.classList.add('active');
            }, 100);
            
            // Close welcome message
            const closeWelcome = welcomeMessage.querySelector('.close-welcome');
            closeWelcome.addEventListener('click', () => {
                welcomeMessage.classList.remove('active');
                setTimeout(() => {
                    welcomeMessage.remove();
                }, 500);
            });
        });
    };
    
    createRegistrationModal();
    
    // Attach click event to CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', () => {
            document.querySelector('.registration-modal').classList.add('active');
        });
    });

    // Dark Mode Toggle
    const createDarkModeToggle = () => {
        const toggle = document.createElement('div');
        toggle.classList.add('dark-mode-toggle');
        toggle.innerHTML = `
            <svg class="dark-mode-icon sun-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF9800" width="16px" height="16px">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z"/>
            </svg>
            <svg class="dark-mode-icon moon-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#BBDEFB" width="16px" height="16px">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M10 2c-1.82 0-3.53.5-5 1.35C7.99 5.08 10 8.3 10 12s-2.01 6.92-5 8.65C6.47 21.5 8.18 22 10 22c5.52 0 10-4.48 10-10S15.52 2 10 2z"/>
            </svg>
        `;
        
        document.body.appendChild(toggle);
        
        // Check for user's preference
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        if (isDarkMode) {
            document.documentElement.classList.add('dark-mode');
        }
        
        // Toggle dark mode
        toggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark-mode');
            const isDarkModeNow = document.documentElement.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDarkModeNow);
            
            // Add transition effect with sound and error handling
            const darkModeSound = new Audio('https://cdn.freesound.org/previews/536/536782_6142149-lq.mp3');
            darkModeSound.volume = 0.2;
            darkModeSound.play().catch(e => console.log("Dark mode sound play failed:", e));
            
            // Update SVG colors for dark mode
            updateSvgColors(isDarkModeNow);
            
            // Animation for toggle
            gsap.fromTo(toggle, 
                { rotation: 0 },
                { rotation: 360, duration: 0.5, ease: "back.out(1.7)" }
            );
        });
    };
    
    // Update SVG colors for dark mode
    const updateSvgColors = (isDarkMode) => {
        // Update dashboard colors
        const dashboardSvg = document.querySelector("#interactive-dashboard svg");
        if (dashboardSvg) {
            const rects = dashboardSvg.querySelectorAll('rect[fill="#F5F7FA"]');
            rects.forEach(rect => {
                rect.setAttribute('fill', isDarkMode ? '#1A1A1A' : '#F5F7FA');
            });
            
            const texts = dashboardSvg.querySelectorAll('text[fill="#666"]');
            texts.forEach(text => {
                text.setAttribute('fill', isDarkMode ? '#B0B0B0' : '#666');
            });
            
            const darkTexts = dashboardSvg.querySelectorAll('text[fill="#333"]');
            darkTexts.forEach(text => {
                text.setAttribute('fill', isDarkMode ? '#E0E0E0' : '#333');
            });
        }
        
        // Update forecast tool colors
        const forecastSvg = document.querySelector("#forecast-tool svg");
        if (forecastSvg) {
            const background = forecastSvg.querySelector('rect[fill="#F5F7FA"]');
            if (background) {
                background.setAttribute('fill', isDarkMode ? '#1A1A1A' : '#F5F7FA');
            }
            
            const lines = forecastSvg.querySelectorAll('path[stroke="#CCC"]');
            lines.forEach(line => {
                line.setAttribute('stroke', isDarkMode ? '#444' : '#CCC');
            });
            
            const labels = forecastSvg.querySelectorAll('text[fill="#666"]');
            labels.forEach(label => {
                label.setAttribute('fill', isDarkMode ? '#B0B0B0' : '#666');
            });
        }
        
        // Update coach SVG colors
        const coachSvg = document.querySelector(".coach-svg");
        if (coachSvg) {
            const gradients = coachSvg.querySelectorAll('stop');
            if (isDarkMode) {
                gradients.forEach(stop => {
                    if (stop.getAttribute('stop-color') === '#64b5f6') {
                        stop.setAttribute('stop-color', '#2196F3');
                    } else if (stop.getAttribute('stop-color') === '#1976D2') {
                        stop.setAttribute('stop-color', '#0D47A1');
                    }
                });
            } else {
                gradients.forEach(stop => {
                    if (stop.getAttribute('stop-color') === '#2196F3') {
                        stop.setAttribute('stop-color', '#64b5f6');
                    } else if (stop.getAttribute('stop-color') === '#0D47A1') {
                        stop.setAttribute('stop-color', '#1976D2');
                    }
                });
            }
        }
    };
    
    createDarkModeToggle();

    // Create interactive dashboard in the coaching section
    const createDashboardViz = () => {
        const dashboard = document.getElementById("interactive-dashboard");
        
        // Create SVG element
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        svg.setAttribute("viewBox", "0 0 500 350");
        
        // Dashboard title
        svg.innerHTML = `
            <rect x="0" y="0" width="500" height="350" rx="8" fill="#F5F7FA" />
            <rect x="0" y="0" width="500" height="50" rx="8" fill="#1976D2" />
            <text x="20" y="30" fill="white" font-size="18" font-weight="bold">Tableau de Bord Financier</text>
            
            <!-- Balance summary -->
            <rect x="20" y="70" width="460" height="80" rx="8" fill="white" stroke="#E0E0E0" stroke-width="1" />
            <text x="40" y="95" fill="#666" font-size="14">Solde actuel</text>
            <text x="40" y="125" fill="#2E7D32" font-size="24" font-weight="bold">8,750 DH</text>
            <text x="170" y="95" fill="#666" font-size="14">Dépenses (ce mois)</text>
            <text x="170" y="125" fill="#F44336" font-size="24" font-weight="bold">-3,240 DH</text>
            <text x="330" y="95" fill="#666" font-size="14">Économies</text>
            <text x="330" y="125" fill="#1976D2" font-size="24" font-weight="bold">+1,200 DH</text>
            
            <!-- Expense categories -->
            <text x="30" y="180" fill="#333" font-size="16" font-weight="bold">Répartition des dépenses</text>
            <rect x="20" y="190" width="220" height="140" rx="8" fill="white" stroke="#E0E0E0" stroke-width="1" />
            
            <!-- Pie chart for expenses -->
            <circle cx="130" cy="260" r="55" fill="none" stroke="#EEEEEE" stroke-width="10" />
            <path d="M130 205 A55 55 0 0 1 181 245" stroke="#F44336" stroke-width="10" fill="none" />
            <path d="M181 245 A55 55 0 0 1 130 315" stroke="#FF9800" stroke-width="10" fill="none" />
            <path d="M130 315 A55 55 0 0 1 81 248" stroke="#2196F3" stroke-width="10" fill="none" />
            <path d="M81 248 A55 55 0 0 1 130 205" stroke="#4CAF50" stroke-width="10" fill="none" />
            
            <!-- Legend -->
            <circle cx="40" cy="210" r="5" fill="#F44336" />
            <text x="55" y="214" fill="#666" font-size="12">Logement (35%)</text>
            <circle cx="40" cy="230" r="5" fill="#FF9800" />
            <text x="55" y="234" fill="#666" font-size="12">Alimentation (25%)</text>
            <circle cx="40" cy="250" r="5" fill="#2196F3" />
            <text x="55" y="254" fill="#666" font-size="12">Transport (20%)</text>
            <circle cx="40" cy="270" r="5" fill="#4CAF50" />
            <text x="55" y="274" fill="#666" font-size="12">Loisirs (20%)</text>
            
            <!-- Budget progress -->
            <text x="270" y="180" fill="#333" font-size="16" font-weight="bold">Suivi budget mensuel</text>
            <rect x="260" y="190" width="220" height="140" rx="8" fill="white" stroke="#E0E0E0" stroke-width="1" />
            
            <!-- Budget bars -->
            <text x="280" y="215" fill="#666" font-size="12">Logement</text>
            <rect x="280" y="220" width="180" height="12" rx="6" fill="#EEEEEE" />
            <rect x="280" y="220" width="170" height="12" rx="6" fill="#F44336" />
            
            <text x="280" y="245" fill="#666" font-size="12">Alimentation</text>
            <rect x="280" y="250" width="180" height="12" rx="6" fill="#EEEEEE" />
            <rect x="280" y="250" width="120" height="12" rx="6" fill="#FF9800" />
            
            <text x="280" y="275" fill="#666" font-size="12">Transport</text>
            <rect x="280" y="280" width="180" height="12" rx="6" fill="#EEEEEE" />
            <rect x="280" y="280" width="90" height="12" rx="6" fill="#2196F3" />
            
            <text x="280" y="305" fill="#666" font-size="12">Loisirs</text>
            <rect x="280" y="310" width="180" height="12" rx="6" fill="#EEEEEE" />
            <rect x="280" y="310" width="140" height="12" rx="6" fill="#4CAF50" />
        `;
        
        dashboard.appendChild(svg);
        
        // Animate the dashboard
        gsap.from(svg.querySelectorAll("rect:not(:first-child), circle, path, text"), {
            opacity: 0,
            y: 10,
            stagger: 0.03,
            duration: 0.6,
            ease: "power1.out"
        });
    };

    // Create forecast tool in the financial forecast section
    const createForecastTool = () => {
        const forecastTool = document.getElementById("forecast-tool");
        
        // Create SVG element
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        svg.setAttribute("viewBox", "0 0 500 150");
        
        // Forecast visualization
        svg.innerHTML = `
            <rect x="0" y="0" width="500" height="150" rx="8" fill="#F5F7FA" />
            
            <!-- Axis -->
            <line x1="50" y1="110" x2="450" y2="110" stroke="#CCC" stroke-width="1" />
            <line x1="50" y1="20" x2="50" y2="110" stroke="#CCC" stroke-width="1" />
            
            <!-- Axis labels - months -->
            <text x="80" y="125" fill="#666" font-size="10">Jan</text>
            <text x="120" y="125" fill="#666" font-size="10">Fév</text>
            <text x="160" y="125" fill="#666" font-size="10">Mar</text>
            <text x="200" y="125" fill="#666" font-size="10">Avr</text>
            <text x="240" y="125" fill="#666" font-size="10">Mai</text>
            <text x="280" y="125" fill="#666" font-size="10">Juil</text>
            <text x="320" y="125" fill="#666" font-size="10">Août</text>
            <text x="360" y="125" fill="#666" font-size="10">Sep</text>
            <text x="400" y="125" fill="#666" font-size="10">Oct</text>
            
            <!-- Value labels -->
            <text x="30" y="110" fill="#666" font-size="10" text-anchor="end">0</text>
            <text x="30" y="80" fill="#666" font-size="10" text-anchor="end">5k</text>
            <text x="30" y="50" fill="#666" font-size="10" text-anchor="end">10k</text>
            <text x="30" y="20" fill="#666" font-size="10" text-anchor="end">15k</text>
            
            <!-- Grid lines -->
            <line x1="50" y1="80" x2="450" y2="80" stroke="#CCC" stroke-width="0.5" stroke-dasharray="4" />
            <line x1="50" y1="50" x2="450" y2="50" stroke="#CCC" stroke-width="0.5" stroke-dasharray="4" />
            <line x1="50" y1="20" x2="450" y2="20" stroke="#CCC" stroke-width="0.5" stroke-dasharray="4" />
            
            <!-- Forecast lines -->
            <path class="balance-line" d="M50,90 L80,88 L120,85 L160,80 L200,75 L240,68 L280,60 L320,50 L360,40 L400,30 L440,20" 
                fill="none" stroke="#1976D2" stroke-width="3" stroke-dasharray="1000" stroke-dashoffset="1000" />
                
            <path class="expenses-line" d="M50,100 L80,102 L120,98 L160,101 L200,97 L240,100 L280,96 L320,99 L360,95 L400,100 L440,98" 
                fill="none" stroke="#F44336" stroke-width="2" stroke-dasharray="1000" stroke-dashoffset="1000" />
            
            <!-- Legend -->
            <circle cx="70" y="140" r="3" fill="#1976D2" />
            <text x="80" y="143" fill="#666" font-size="10">Épargne prévue</text>
            
            <circle cx="180" y="140" r="3" fill="#F44336" />
            <text x="190" y="143" fill="#666" font-size="10">Dépenses prévues</text>
        `;
        
        forecastTool.appendChild(svg);
        
        // Animate the forecast lines
        gsap.to(svg.querySelector(".balance-line"), {
            strokeDashoffset: 0,
            duration: 2,
            ease: "power1.inOut"
        });
        
        gsap.to(svg.querySelector(".expenses-line"), {
            strokeDashoffset: 0,
            duration: 2,
            delay: 0.5,
            ease: "power1.inOut"
        });
    };

    // Setup the financial coach chat functionality
    const setupFinancialCoach = () => {
        const virtualCoachAvatar = document.getElementById('virtual-coach');
        const chatInterface = document.querySelector('.coach-chat-interface');
        const closeChat = document.querySelector('.close-chat');
        const minimizeChat = document.querySelector('.minimize-chat');
        const chatInput = document.querySelector('.chat-input input');
        const chatSubmit = document.querySelector('.chat-input button');
        const chatMessages = document.querySelector('.chat-messages');
        const suggestionButtons = document.querySelectorAll('.suggestion-btn');
        
        // Enhanced predefined responses for a wider range of financial questions
        const financialResponses = {
            'épargne': 'Pour économiser efficacement, essayez la règle 50/30/20: 50% pour les besoins essentiels, 30% pour les envies, et 20% pour l\'épargne. Commencez petit et augmentez progressivement.',
            'dette': 'Pour gérer vos dettes, commencez par la méthode "boule de neige": remboursez d\'abord les dettes avec les taux d\'intérêt les plus élevés tout en maintenant les paiements minimums sur les autres.',
            'investissement': 'Pour débuter en investissement, pensez à diversifier vos placements. Commencez par un fonds indiciel avec de faibles frais et investissez régulièrement, peu importe le montant.',
            'budget': 'La clé d\'un bon budget est de suivre toutes vos dépenses pendant un mois pour voir où va votre argent, puis d\'établir des limites réalistes par catégorie.',
            'retraite': 'Il n\'est jamais trop tôt pour préparer sa retraite. Même de petites contributions régulières peuvent se transformer en somme importante grâce aux intérêts composés.',
            'urgence': 'Un fonds d\'urgence devrait couvrir 3 à 6 mois de dépenses essentielles. Commencez petit et alimentez-le régulièrement jusqu\'à atteindre votre objectif.',
            'objectif': 'Pour atteindre un objectif financier, rendez-le SMART: Spécifique, Mesurable, Atteignable, Réaliste et Temporellement défini.',
            'analyse': 'Je peux analyser vos habitudes de dépenses et vous aider à identifier les domaines où vous pourriez économiser. Commençons par examiner vos transactions du mois dernier.',
            'immobilier': 'Pour investir dans l\'immobilier, considérez la règle des 3 P: Prix, Position et Potentiel. Assurez-vous également que votre capacité d\'emprunt ne dépasse pas 33% de vos revenus.',
            'actions': 'Les actions peuvent offrir de bons rendements à long terme. Diversifiez votre portefeuille et envisagez d\'investir régulièrement via des plans d\'investissement automatiques.',
            'crypto': 'Les cryptomonnaies sont des investissements à haut risque. N\'investissez que ce que vous êtes prêt à perdre et faites vos recherches avant de vous lancer.',
            'assurance': 'Réévaluez vos polices d\'assurance chaque année pour vous assurer qu\'elles correspondent à vos besoins actuels et comparez les offres pour obtenir le meilleur rapport qualité-prix.',
            'revenu': 'Pour augmenter vos revenus, considérez le développement de compétences en demande, une activité complémentaire, ou négociez une augmentation en présentant clairement votre valeur.',
            'prêt': 'Avant de contracter un prêt, comparez les taux d\'intérêt, les frais et les conditions de remboursement. Assurez-vous que les mensualités sont compatibles avec votre budget.',
            'cashback': 'Utilisez des cartes avec programmes de cashback pour vos achats quotidiens. C\'est une façon simple d\'économiser sur des dépenses que vous feriez de toute façon.',
            'frais': 'Surveillez les frais bancaires et d\'investissement. Même 1% de frais peut significativement réduire vos rendements à long terme.',
            'impôt': 'Planifiez votre stratégie fiscale à l\'avance. Utilisez des comptes d\'épargne défiscalisés et documentez soigneusement vos dépenses déductibles.',
            'entreprise': 'Pour financer votre entreprise, explorez les options comme les prêts bancaires, les investisseurs providentiels, le capital-risque ou le financement participatif.',
            'économiser': 'Pour économiser sur vos factures courantes, comparez régulièrement les offres de fournisseurs, regroupez vos achats, et utilisez des applications de coupons ou de cashback.',
            'automobile': 'Une voiture perd environ 20% de sa valeur la première année. Considérez l\'achat d\'un véhicule d\'occasion récent pour éviter cette dépréciation initiale.',
            'enfant': 'Commencez à épargner tôt pour l\'éducation de vos enfants. Les plans d\'épargne éducation offrent des avantages fiscaux et peuvent croître considérablement avec le temps.',
            'voyage': 'Établissez un budget voyage et épargnez régulièrement dans un compte dédié. Utilisez des comparateurs de prix et soyez flexible sur les dates pour économiser.',
            'bonus': 'Lorsque vous recevez un bonus ou un remboursement imprévu, envisagez d\'en utiliser 50% pour l\'épargne, 30% pour rembourser des dettes et 20% pour vous faire plaisir.',
            'perte': 'En cas de perte d\'emploi, réduisez immédiatement vos dépenses non essentielles, contactez vos créanciers pour des arrangements de paiement et activez votre fonds d\'urgence.',
            'inflation': 'Pour protéger votre épargne contre l\'inflation, diversifiez vos investissements dans des actifs comme les actions, l\'immobilier ou les obligations indexées sur l\'inflation.',
            'endettement': 'Si vos dettes deviennent ingérables, considérez la consolidation de dettes ou consultez un conseiller financier pour explorer les options de restructuration.',
            'heritage': 'Planifiez votre succession en établissant un testament, des procurations et en organisant vos documents financiers. Consultez un spécialiste pour optimiser la transmission.',
            'automatisation': 'Automatisez vos finances: paiements de factures, virements d\'épargne et investissements. Cela renforce la discipline et réduit le risque d\'oublis coûteux.',
            'business': 'Pour votre entreprise, séparez vos finances personnelles et professionnelles, suivez vos dépenses déductibles et prévoyez vos impôts trimestriellement.',
            'loyer': 'La règle générale est de ne pas dépenser plus de 30% de vos revenus mensuels pour le logement. Ajustez votre budget en conséquence ou envisagez des options plus abordables.',
            'credit': 'Maintenez un bon score de crédit en payant vos factures à temps, en gardant un faible ratio d\'utilisation de crédit et en limitant les nouvelles demandes de crédit.',
            'sante': 'Investissez dans une bonne assurance santé pour éviter des dépenses catastrophiques imprévues qui pourraient ruiner votre plan financier.',
            'stage': 'Les stages peuvent être un excellent investissement dans votre carrière, même s\'ils sont moins bien rémunérés. Ils peuvent déboucher sur de meilleures opportunités professionnelles.',
            'bourse': 'Pour investir en bourse, commencez par comprendre votre tolérance au risque et vos objectifs. Considérez les ETF ou fonds indiciels pour une exposition diversifiée à moindre coût.',
            'ai': 'Notre IA financière analyse vos habitudes de dépenses et peut vous suggérer des ajustements personnalisés pour atteindre vos objectifs plus rapidement.',
            'analyse ai': 'Notre système d\'IA peut analyser vos transactions pour identifier des tendances, des abonnements non utilisés et des opportunités d\'économies que vous pourriez manquer.',
            'cashflow': 'Gérez votre flux de trésorerie en échelonnant vos paiements tout au long du mois et en gardant une réserve tampon pour les dépenses imprévues.',
            'gamification': 'Notre système de défis financiers vous aide à atteindre vos objectifs tout en vous amusant. Complétez des défis d\'épargne pour gagner des badges et des récompenses!',
            'challenge': 'Rejoignez notre défi d\'épargne de 30 jours! Mettez de côté un petit montant chaque jour et voyez combien vous pouvez économiser en un mois.',
            'default': 'Je suis Coach Budget AI, votre assistant financier intelligent. Je peux analyser vos habitudes financières, optimiser votre budget, et vous conseiller sur l\'épargne, l\'investissement et plus encore. Comment puis-je vous aider aujourd\'hui?'
        };
        
        // Open chat when clicking on the virtual coach
        virtualCoachAvatar.addEventListener('click', () => {
            chatInterface.classList.add('active');
            // Animate brain waves on the coach SVG
            const brainWave = document.querySelector('.brain-wave');
            if (brainWave) {
                gsap.to(brainWave, {
                    opacity: 1,
                    duration: 0.5,
                    repeat: 3,
                    yoyo: true
                });
            }
        });
        
        // Close chat functionality
        closeChat.addEventListener('click', () => {
            chatInterface.classList.remove('active');
        });
        
        // Minimize chat functionality
        minimizeChat.addEventListener('click', () => {
            chatInterface.classList.toggle('minimized');
        });
        
        // Enhanced message processing with AI-like responses
        const sendMessage = (message) => {
            if (message.trim() === '') return;
            
            // Add user message
            const userMessageElement = document.createElement('div');
            userMessageElement.classList.add('message', 'user-message');
            userMessageElement.textContent = message;
            chatMessages.appendChild(userMessageElement);
            
            // Scroll to the bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Clear input
            chatInput.value = '';
            
            // Show typing indicator
            const typingIndicator = document.createElement('div');
            typingIndicator.classList.add('typing-indicator');
            typingIndicator.innerHTML = '<span></span><span></span><span></span>';
            chatMessages.appendChild(typingIndicator);
            
            // Scroll to the bottom again
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Generate response after a delay to simulate AI thinking
            setTimeout(() => {
                // Remove typing indicator
                typingIndicator.remove();
                
                // Find appropriate response with enhanced matching
                let response = financialResponses.default;
                const messageLower = message.toLowerCase();
                
                // Check for multiple keywords in the message for more contextual responses
                const matchedKeywords = [];
                let highestPriorityMatch = '';
                
                // Prioritize longer keyword matches (more specific responses)
                for (const [keyword, resp] of Object.entries(financialResponses)) {
                    if (messageLower.includes(keyword) && keyword !== 'default') {
                        matchedKeywords.push({keyword, length: keyword.length});
                    }
                }
                
                // Sort matches by length (longer = more specific)
                if (matchedKeywords.length > 0) {
                    matchedKeywords.sort((a, b) => b.length - a.length);
                    highestPriorityMatch = matchedKeywords[0].keyword;
                    response = financialResponses[highestPriorityMatch];
                }
                
                // Special case for questions about AI features
                if (messageLower.includes('ai') && messageLower.includes('analyse')) {
                    response = financialResponses['analyse ai'];
                }
                
                // Personalized response with user name if available
                if (localStorage.getItem('username')) {
                    const username = localStorage.getItem('username');
                    // Occasionally add personalization
                    if (Math.random() > 0.5) {
                        response = `${username}, ${response.charAt(0).toLowerCase() + response.slice(1)}`;
                    }
                }
                
                // Add coach response
                const coachMessageElement = document.createElement('div');
                coachMessageElement.classList.add('message', 'coach-message');
                coachMessageElement.textContent = response;
                chatMessages.appendChild(coachMessageElement);
                
                // Add a follow-up suggestion based on the current topic
                if (highestPriorityMatch && Math.random() > 0.5) {
                    setTimeout(() => {
                        const followUps = {
                            'épargne': 'Souhaitez-vous que je vous aide à définir un objectif d\'épargne spécifique?',
                            'investissement': 'Puis-je vous présenter des options d\'investissement adaptées à votre profil de risque?',
                            'dette': 'Voulez-vous que je vous aide à établir un plan de remboursement de dettes?',
                            'budget': 'Aimeriez-vous que je vous propose un modèle de budget personnalisé?',
                            'retraite': 'Souhaitez-vous que je vous montre comment optimiser votre épargne retraite?',
                            'immobilier': 'Voulez-vous simuler un plan de financement immobilier?',
                            'actions': 'Aimeriez-vous en savoir plus sur notre portefeuille d\'investissement automatisé?'
                        };
                        
                        if (followUps[highestPriorityMatch]) {
                            const followUpElement = document.createElement('div');
                            followUpElement.classList.add('message', 'coach-message');
                            followUpElement.textContent = followUps[highestPriorityMatch];
                            chatMessages.appendChild(followUpElement);
                            chatMessages.scrollTop = chatMessages.scrollHeight;
                        }
                    }, 1000);
                }
                
                // Scroll to the bottom
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                // Animate the brain waves again
                const brainWave = document.querySelector('.brain-wave');
                if (brainWave) {
                    gsap.to(brainWave, {
                        opacity: 1,
                        duration: 0.5,
                        repeat: 3,
                        yoyo: true
                    });
                }
            }, 1500);
        };
        
        // Submit on button click
        chatSubmit.addEventListener('click', () => {
            sendMessage(chatInput.value);
        });
        
        // Submit on Enter key
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                sendMessage(chatInput.value);
            }
        });
        
        // Handle suggestion buttons
        suggestionButtons.forEach(button => {
            button.addEventListener('click', () => {
                sendMessage(button.textContent);
            });
        });
        
        // Animate the coach SVG
        const animateCoach = () => {
            const coachSvg = document.querySelector('.coach-svg');
            if (coachSvg) {
                gsap.to(coachSvg, {
                    y: -10,
                    duration: 2,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });
            }
        };
        
        animateCoach();
    };

    createDashboardViz();
    createForecastTool();
    setupFinancialCoach();
    
    // Add the Gamified Challenges Section
    const createGamifiedChallengesSection = () => {
        const challengesSection = document.getElementById('challenges');
        
        // Create challenge cards with animated effects
        const challenges = [
            {
                title: "Défi 30 jours",
                description: "Économisez 10 DH chaque jour pendant 30 jours",
                reward: "Badge 'Épargnant Discipliné' + 50 points",
                progress: 75,
                icon: "calendar-check",
                color: "#FF9800",
                theme: "vacances"
            },
            {
                title: "Zéro Dépense Superflue",
                description: "Aucune dépense non-essentielle pendant 2 semaines",
                reward: "20% cashback sur votre prochaine épicerie",
                progress: 50,
                icon: "ban",
                color: "#E91E63",
                theme: "économie"
            },
            {
                title: "Objectif Voiture",
                description: "Épargnez 10,000 DH pour votre nouvelle voiture",
                reward: "Badge 'Planificateur Pro' + Bon d'achat de 250 DH",
                progress: 35,
                icon: "car",
                color: "#2196F3",
                theme: "achat"
            }
        ];
        
        // Create the challenges header
        const challengesHeader = document.createElement('div');
        challengesHeader.className = 'challenges-header';
        challengesHeader.innerHTML = `
            <h2>Défis et Récompenses</h2>
            <div class="challenges-tabs">
                <button class="challenge-tab active" data-theme="all">Tous</button>
                <button class="challenge-tab" data-theme="vacances">Vacances</button>
                <button class="challenge-tab" data-theme="économie">Économies</button>
                <button class="challenge-tab" data-theme="achat">Achats</button>
            </div>
        `;
        challengesSection.appendChild(challengesHeader);
        
        // Create challenges container
        const challengesContainer = document.createElement('div');
        challengesContainer.className = 'challenges-container';
        
        // Create challenge cards
        challenges.forEach((challenge, index) => {
            const challengeCard = document.createElement('div');
            challengeCard.className = `challenge-card ${challenge.theme}`;
            challengeCard.style.animationDelay = `${index * 0.15}s`;
            
            challengeCard.innerHTML = `
                <div class="challenge-icon" style="background-color: ${challenge.color}">
                    <i class="fas fa-${challenge.icon}"></i>
                </div>
                <div class="challenge-content">
                    <h3>${challenge.title}</h3>
                    <p>${challenge.description}</p>
                    <div class="challenge-progress-container">
                        <div class="challenge-progress-bar">
                            <div class="challenge-progress-fill" style="width: ${challenge.progress}%; background-color: ${challenge.color}"></div>
                        </div>
                        <span class="challenge-progress-text">${challenge.progress}% complété</span>
                    </div>
                    <div class="challenge-reward">
                        <span class="reward-label">Récompense:</span>
                        <span class="reward-text">${challenge.reward}</span>
                    </div>
                    <button class="challenge-button" style="background-color: ${challenge.color}">Participer</button>
                </div>
                <div class="challenge-effects"></div>
            `;
            
            challengesContainer.appendChild(challengeCard);
        });
        
        challengesSection.appendChild(challengesContainer);
        
        // Create leaderboard section
        const leaderboardSection = document.createElement('div');
        leaderboardSection.className = 'leaderboard-section';
        
        const leaderboardHeader = document.createElement('div');
        leaderboardHeader.className = 'leaderboard-header';
        leaderboardHeader.innerHTML = `
            <h3>Classement des Champions d'Épargne</h3>
            <p>Qui économise le plus ce mois-ci?</p>
        `;
        
        const leaderboard = document.createElement('div');
        leaderboard.className = 'leaderboard';
        
        // Sample leaderboard data
        const leaderboardData = [
            { rank: 1, name: "Karim B.", amount: "2,450 DH", avatar: "#1976D2" },
            { rank: 2, name: "Fatima L.", amount: "2,100 DH", avatar: "#FF9800" },
            { rank: 3, name: "Mohammed R.", amount: "1,750 DH", avatar: "#4CAF50" },
            { rank: 4, name: "Vous", amount: "1,630 DH", avatar: "#9C27B0", isUser: true },
            { rank: 5, name: "Ahmed K.", amount: "1,580 DH", avatar: "#E91E63" }
        ];
        
        // Generate leaderboard entries
        leaderboardData.forEach(entry => {
            const leaderboardEntry = document.createElement('div');
            leaderboardEntry.className = `leaderboard-entry${entry.isUser ? ' is-user' : ''}`;
            
            leaderboardEntry.innerHTML = `
                <div class="leaderboard-rank">${entry.rank}</div>
                <div class="leaderboard-avatar" style="background-color: ${entry.avatar}">${entry.name.charAt(0)}</div>
                <div class="leaderboard-name">${entry.name}</div>
                <div class="leaderboard-amount">${entry.amount}</div>
                ${entry.isUser ? '<div class="leaderboard-user-badge">Vous</div>' : ''}
            `;
            
            leaderboard.appendChild(leaderboardEntry);
        });
        
        // Create join competition button
        const joinCompetition = document.createElement('button');
        joinCompetition.className = 'join-competition-button';
        joinCompetition.innerHTML = `
            <i class="fas fa-trophy"></i> Créer une compétition avec vos amis
        `;
        
        leaderboardSection.appendChild(leaderboardHeader);
        leaderboardSection.appendChild(leaderboard);
        leaderboardSection.appendChild(joinCompetition);
        
        // Create badges showcase
        const badgesSection = document.createElement('div');
        badgesSection.className = 'badges-section';
        
        badgesSection.innerHTML = `
            <h3>Vos Badges et Accomplissements</h3>
            <div class="badges-container">
                <div class="badge-item unlocked">
                    <div class="badge-icon">
                        <i class="fas fa-seedling"></i>
                    </div>
                    <span class="badge-name">Jeune Pousse</span>
                </div>
                <div class="badge-item unlocked">
                    <div class="badge-icon">
                        <i class="fas fa-rocket"></i>
                    </div>
                    <span class="badge-name">Départ Éclair</span>
                </div>
                <div class="badge-item">
                    <div class="badge-icon">
                        <i class="fas fa-coins"></i>
                    </div>
                    <span class="badge-name">Roi de l'Épargne</span>
                </div>
                <div class="badge-item">
                    <div class="badge-icon">
                        <i class="fas fa-chart-line"></i>
                    </div>
                    <span class="badge-name">Investisseur Futé</span>
                </div>
                <div class="badge-item">
                    <div class="badge-icon">
                        <i class="fas fa-fire"></i>
                    </div>
                    <span class="badge-name">En Feu!</span>
                </div>
            </div>
        `;
        
        // Add sections to the main challenges section
        const challengeLayout = document.createElement('div');
        challengeLayout.className = 'challenge-layout';
        challengeLayout.appendChild(challengesContainer);
        
        const challengeSidebar = document.createElement('div');
        challengeSidebar.className = 'challenge-sidebar';
        challengeSidebar.appendChild(leaderboardSection);
        challengeSidebar.appendChild(badgesSection);
        
        const challengeContent = document.createElement('div');
        challengeContent.className = 'challenge-content-wrapper';
        challengeContent.appendChild(challengeLayout);
        challengeContent.appendChild(challengeSidebar);
        
        challengesSection.appendChild(challengeContent);
        
        // Add animations and interactivity
        
        // Animate progress bars on scroll
        const animateProgress = () => {
            const progressBars = document.querySelectorAll('.challenge-progress-fill');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const bar = entry.target;
                        const width = bar.style.width;
                        
                        bar.style.width = '0%';
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 100);
                        
                        observer.unobserve(bar);
                    }
                });
            }, { threshold: 0.2 });
            
            progressBars.forEach(bar => {
                observer.observe(bar);
            });
        };
        
        // Add confetti effect to challenge cards
        const addConfettiEffect = () => {
            const challengeCards = document.querySelectorAll('.challenge-card');
            
            challengeCards.forEach(card => {
                const effectsContainer = card.querySelector('.challenge-effects');
                
                card.addEventListener('mouseenter', () => {
                    // Create confetti particles
                    for (let i = 0; i < 30; i++) {
                        const confetti = document.createElement('div');
                        confetti.className = 'confetti-particle';
                        
                        // Random confetti properties
                        const size = Math.random() * 8 + 4;
                        const color = ['#FFC107', '#2196F3', '#4CAF50', '#E91E63', 
                        '#FFEB3B', '#9C27B0', '#3F51B5', '#00BCD4'][Math.floor(Math.random() * 5)];
                        const shape = Math.random() > 0.5 ? '50%' : '0';
                        
                        confetti.style.width = `${size}px`;
                        confetti.style.height = `${size}px`;
                        confetti.style.backgroundColor = color;
                        confetti.style.borderRadius = shape;
                        
                        // Random position and animation
                        confetti.style.left = `${Math.random() * 100}%`;
                        confetti.style.top = `${Math.random() * 100}%`;
                        
                        effectsContainer.appendChild(confetti);
                        
                        // Animate confetti
                        gsap.to(confetti, {
                            y: Math.random() * 80 - 40,
                            x: Math.random() * 80 - 40,
                            rotation: Math.random() * 360,
                            opacity: 0,
                            duration: 1 + Math.random(),
                            onComplete: () => {
                                confetti.remove();
                            }
                        });
                    }
                });
            });
        };
        
        // Add tab functionality
        const setupTabFiltering = () => {
            const tabs = document.querySelectorAll('.challenge-tab');
            const cards = document.querySelectorAll('.challenge-card');
            
            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    // Update active tab
                    tabs.forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                    
                    // Filter cards
                    const theme = tab.dataset.theme;
                    
                    cards.forEach(card => {
                        if (theme === 'all' || card.classList.contains(theme)) {
                            card.style.display = 'flex';
                            // Animate cards coming back
                            gsap.fromTo(card, 
                                { opacity: 0, y: 20 },
                                { opacity: 1, y: 0, duration: 0.5, ease: "power1.out" }
                            );
                        } else {
                            // Animate cards going away
                            gsap.to(card, {
                                opacity: 0,
                                y: 20,
                                duration: 0.3,
                                onComplete: () => {
                                    card.style.display = 'none';
                                }
                            });
                        }
                    });
                });
            });
        };
        
        // Add badge glow effect
        const addBadgeEffects = () => {
            const unlockedBadges = document.querySelectorAll('.badge-item.unlocked');
            
            unlockedBadges.forEach(badge => {
                const icon = badge.querySelector('.badge-icon');
                
                // Add pulsing animation
                gsap.to(icon, {
                    boxShadow: '0 0 15px rgba(255, 215, 0, 0.7)',
                    scale: 1.05,
                    duration: 1.5,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });
            });
        };
        
        // Add hover effect to leaderboard entries
        const addLeaderboardEffects = () => {
            const leaderboardEntries = document.querySelectorAll('.leaderboard-entry');
            
            leaderboardEntries.forEach(entry => {
                entry.addEventListener('mouseenter', () => {
                    gsap.to(entry, {
                        backgroundColor: 'rgba(25, 118, 210, 0.1)',
                        x: 5,
                        duration: 0.3
                    });
                });
                
                entry.addEventListener('mouseleave', () => {
                    gsap.to(entry, {
                        backgroundColor: 'transparent',
                        x: 0,
                        duration: 0.3
                    });
                });
            });
            
            // Add special animation for user entry
            const userEntry = document.querySelector('.leaderboard-entry.is-user');
            if (userEntry) {
                gsap.to(userEntry, {
                    backgroundColor: 'rgba(156, 39, 176, 0.08)',
                    repeat: -1,
                    yoyo: true,
                    duration: 2
                });
            }
        };
        
        // Add animation to challenge buttons
        const addButtonEffects = () => {
            const buttons = document.querySelectorAll('.challenge-button, .join-competition-button');
            
            buttons.forEach(button => {
                button.addEventListener('mouseenter', () => {
                    gsap.to(button, {
                        y: -3,
                        boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
                        duration: 0.3
                    });
                });
                
                button.addEventListener('mouseleave', () => {
                    gsap.to(button, {
                        y: 0,
                        boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
                        duration: 0.3
                    });
                });
                
                button.addEventListener('click', () => {
                    // Play sound effect with error handling
                    const clickSound = new Audio('https://cdn.freesound.org/previews/561/561660_7107485-lq.mp3');
                    clickSound.volume = 0.2;
                    clickSound.play().catch(e => console.log("Challenge button sound failed:", e));
                    
                    // Add click animation
                    gsap.timeline()
                        .to(button, {
                            scale: 0.95,
                            duration: 0.1
                        })
                        .to(button, {
                            scale: 1,
                            duration: 0.2,
                            ease: "back.out(3)"
                        });
                });
            });
        };
        
        // Run all the animations and effects
        setTimeout(() => {
            animateProgress();
            addConfettiEffect();
            setupTabFiltering();
            addBadgeEffects();
            addLeaderboardEffects();
            addButtonEffects();
        }, 500);
    };
    
    createGamifiedChallengesSection();
    
    // Create Rewards Shop Section
    const createRewardsShopSection = () => {
        const rewardsSection = document.getElementById('rewards-shop');
        
        // Create rewards shop header
        const rewardsHeader = document.createElement('div');
        rewardsHeader.className = 'rewards-shop-header';
        rewardsHeader.innerHTML = `
            <h2>Boutique de Récompenses</h2>
            <p>Échangez vos points accumulés contre des récompenses exclusives ! Participez aux défis pour gagner plus de points.</p>
            
            <div class="rewards-categories">
                <button class="reward-category active" data-category="all">Toutes les récompenses</button>
                <button class="reward-category" data-category="gift-cards">Cartes cadeaux</button>
                <button class="reward-category" data-category="cashback">Cashback</button>
                <button class="reward-category" data-category="premium">Services premium</button>
                <button class="reward-category" data-category="partner">Offres partenaires</button>
            </div>
        `;
        rewardsSection.appendChild(rewardsHeader);
        
        // Sample rewards data
        const rewards = [
            {
                name: "Carte cadeau Amazon",
                description: "Une carte cadeau de 50 DH utilisable sur Amazon",
                points: 2500,
                value: "50 DH",
                icon: "gift-card",
                category: "gift-cards",
                premium: false
            },
            {
                name: "Carte cadeau Fnac",
                description: "Une carte cadeau de 100 DH valable dans tous les magasins Fnac",
                points: 5000,
                value: "100 DH",
                icon: "store",
                category: "gift-cards",
                premium: false
            },
            {
                name: "Cashback Épicerie",
                description: "Obtenez 5% de remboursement sur votre prochaine course d'épicerie",
                points: 3000,
                value: "5% cashback",
                icon: "shopping-cart",
                category: "cashback",
                premium: false
            },
            {
                name: "Conseiller Financier Pro",
                description: "30 minutes de consultation avec un expert financier certifié",
                points: 8000,
                value: "250 DH",
                icon: "user-tie",
                category: "premium",
                premium: true
            },
            {
                name: "Abonnement Premium 1 mois",
                description: "Accès à toutes les fonctionnalités premium pendant 1 mois",
                points: 7500,
                value: "49,99 DH",
                icon: "crown",
                category: "premium",
                premium: true
            },
            {
                name: "Réduction Assurance Auto",
                description: "10% de réduction sur votre prochaine cotisation d'assurance auto",
                points: 6000,
                value: "10% réduction",
                icon: "car",
                category: "partner",
                premium: false
            },
            {
                name: "Mois Gratuit Gym",
                description: "Un mois d'abonnement gratuit dans notre réseau de salles de sport partenaires",
                points: 5500,
                value: "150 DH",
                icon: "dumbbell",
                category: "partner",
                premium: false
            },
            {
                name: "Cashback Resto",
                description: "15% de remboursement sur votre prochain repas au restaurant",
                points: 4000,
                value: "15% cashback",
                icon: "utensils",
                category: "cashback",
                premium: true
            }
        ];
        
        // Create rewards container
        const rewardsContainer = document.createElement('div');
        rewardsContainer.className = 'rewards-container';
        
        // Generate reward cards
        rewards.forEach((reward, index) => {
            const rewardCard = document.createElement('div');
            rewardCard.className = `reward-card ${reward.premium ? 'reward-card-premium' : ''}`;
            rewardCard.dataset.category = reward.category;
            rewardCard.style.animationDelay = `${index * 0.1}s`;
            
            // Current user points (simulated)
            const userPoints = 6000;
            const canClaim = userPoints >= reward.points;
            
            rewardCard.innerHTML = `
                <div class="reward-image">
                    <i class="reward-icon fas fa-${reward.icon}"></i>
                </div>
                <div class="reward-content">
                    <h3>${reward.name}</h3>
                    <p>${reward.description}</p>
                    <div class="reward-details">
                        <div class="reward-points">
                            <i class="fas fa-coins"></i> ${reward.points}
                        </div>
                        <div class="reward-value">${reward.value}</div>
                    </div>
                    <button class="claim-reward-button ${!canClaim ? 'disabled' : ''}">
                        ${canClaim ? '<i class="fas fa-check-circle"></i> Échanger' : '<i class="fas fa-lock"></i> Points insuffisants'}
                    </button>
                </div>
                <div class="reward-claimed-overlay">
                    <div class="reward-claimed-message">
                        <i class="fas fa-check-circle"></i> Récompense réclamée !
                    </div>
                </div>
            `;
            
            rewardsContainer.appendChild(rewardCard);
        });
        
        rewardsSection.appendChild(rewardsContainer);
        
        // Add rewards footer with point balance
        const rewardsFooter = document.createElement('div');
        rewardsFooter.className = 'rewards-footer';
        rewardsFooter.innerHTML = `
            <div class="rewards-total">
                <i class="fas fa-coins"></i> Vos points: 6,000
            </div>
            <p class="rewards-disclaimer">
                Les points sont gagnés en accomplissant des défis et en atteignant des objectifs financiers. 
                Les récompenses peuvent changer et sont soumises à disponibilité.
            </p>
        `;
        
        rewardsSection.appendChild(rewardsFooter);
        
        // Add animations and interactions
        
        // Filter rewards by category
        const setupCategoryFilters = () => {
            const categoryButtons = document.querySelectorAll('.reward-category');
            const rewardCards = document.querySelectorAll('.reward-card');
            
            categoryButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Update active state
                    categoryButtons.forEach(b => b.classList.remove('active'));
                    button.classList.add('active');
                    
                    // Filter cards
                    const category = button.dataset.category;
                    
                    rewardCards.forEach(card => {
                        if (category === 'all' || card.dataset.category === category) {
                            // Show with animation
                            gsap.fromTo(card, 
                                { opacity: 0, y: 20 },
                                { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", display: 'block' }
                            );
                        } else {
                            // Hide with animation
                            gsap.to(card, {
                                opacity: 0, 
                                y: 20, 
                                duration: 0.3, 
                                ease: "power2.in",
                                onComplete: () => {
                                    card.style.display = 'none';
                                }
                            });
                        }
                    });
                    
                    // Play filter sound with error handling
                    const filterSound = new Audio('https://cdn.freesound.org/previews/256/256116_4486188-lq.mp3');
                    filterSound.volume = 0.2;
                    filterSound.play().catch(e => console.log("Filter sound play failed:", e));
                });
            });
        };
        
        // Add claim button functionality
        const setupClaimButtons = () => {
            const claimButtons = document.querySelectorAll('.claim-reward-button:not(.disabled)');
            
            claimButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const rewardCard = button.closest('.reward-card');
                    
                    // Play reward claim sound with error handling
                    const claimSound = new Audio('https://cdn.freesound.org/previews/220/220173_4100816-lq.mp3');
                    claimSound.volume = 0.3;
                    claimSound.play().catch(e => console.log("Claim sound play failed:", e));
                    
                    // Show confetti effect
                    createConfettiEffect(rewardCard);
                    
                    // Mark as claimed
                    rewardCard.classList.add('claimed');
                    
                    // Update button
                    button.innerHTML = '<i class="fas fa-check-circle"></i> Réclamée';
                    button.classList.add('disabled');
                    
                    // Update points balance
                    const pointsElement = document.querySelector('.rewards-total');
                    const currentPoints = parseInt(pointsElement.textContent.match(/\d+/)[0].replace(/,/g, ''));
                    const pointsCost = parseInt(rewardCard.querySelector('.reward-points').textContent.replace(/,/g, ''));
                    const newPoints = currentPoints - pointsCost;
                    
                    setTimeout(() => {
                        gsap.to(pointsElement, {
                            scale: 1.1,
                            duration: 0.3,
                            ease: "back.out(1.7)",
                            onComplete: () => {
                                pointsElement.innerHTML = `<i class="fas fa-coins"></i> Vos points: ${newPoints.toLocaleString()}`;
                                gsap.to(pointsElement, {
                                    scale: 1,
                                    duration: 0.3,
                                    ease: "back.out"
                                });
                            }
                        });
                    }, 800);
                    
                    // Disable other buttons if not enough points left
                    setTimeout(() => {
                        const otherButtons = document.querySelectorAll('.claim-reward-button:not(.disabled)');
                        otherButtons.forEach(otherBtn => {
                            const pointsCost = parseInt(otherBtn.closest('.reward-card').querySelector('.reward-points').textContent.replace(/,/g, ''));
                            if (pointsCost > newPoints) {
                                otherBtn.innerHTML = '<i class="fas fa-lock"></i> Points insuffisants';
                                otherBtn.classList.add('disabled');
                            }
                        });
                    }, 1200);
                });
            });
        };
        
        // Create confetti effect
        const createConfettiEffect = (element) => {
            // Create confetti container if it doesn't exist
            let confettiContainer = element.querySelector('.confetti-container');
            if (!confettiContainer) {
                confettiContainer = document.createElement('div');
                confettiContainer.className = 'confetti-container';
                confettiContainer.style.position = 'absolute';
                confettiContainer.style.top = '0';
                confettiContainer.style.left = '0';
                confettiContainer.style.width = '100%';
                confettiContainer.style.height = '100%';
                confettiContainer.style.pointerEvents = 'none';
                confettiContainer.style.zIndex = '10';
                element.appendChild(confettiContainer);
            }
            
            // Create confetti pieces
            for (let i = 0; i < 60; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                
                // Random properties
                const size = Math.random() * 10 + 5;
                const borderRadius = Math.random() > 0.5 ? '50%' : '0';
                const colors = [
                    '#FF9800', '#2196F3', '#4CAF50', '#E91E63', 
                    '#FFEB3B', '#9C27B0', '#3F51B5', '#00BCD4'
                ];
                const color = colors[Math.floor(Math.random() * colors.length)];
                
                // Style confetti
                confetti.style.position = 'absolute';
                confetti.style.width = `${size}px`;
                confetti.style.height = `${size}px`;
                confetti.style.backgroundColor = color;
                confetti.style.borderRadius = borderRadius;
                confetti.style.opacity = Math.random() * 0.5 + 0.5;
                
                // Start position (centered, bottom)
                confetti.style.bottom = '50%';
                confetti.style.left = '50%';
                
                confettiContainer.appendChild(confetti);
                
                // Animate with GSAP
                gsap.to(confetti, {
                    x: (Math.random() - 0.5) * element.offsetWidth,
                    y: (Math.random() - 1) * element.offsetHeight,
                    rotation: Math.random() * 360,
                    scale: Math.random() * 1.5 + 0.5,
                    duration: Math.random() * 2 + 1,
                    ease: "power1.out",
                    onComplete: () => {
                        confetti.remove();
                    }
                });
            }
        };
        
        // Add hover animations to reward cards
        const addCardAnimations = () => {
            const rewardCards = document.querySelectorAll('.reward-card');
            
            rewardCards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    gsap.to(card.querySelector('.reward-icon'), {
                        y: -10,
                        scale: 1.1,
                        rotation: 5,
                        duration: 0.3,
                        ease: "back.out(1.7)"
                    });
                });
                
                card.addEventListener('mouseleave', () => {
                    gsap.to(card.querySelector('.reward-icon'), {
                        y: 0,
                        scale: 1,
                        rotation: 0,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });
            });
        };
        
        // Run all animations and setups
        setTimeout(() => {
            setupCategoryFilters();
            setupClaimButtons();
            addCardAnimations();
        }, 500);
    };

    createRewardsShopSection();
    
    // Credit Card Animation
    const setupCreditCardAnimation = () => {
        const creditCard = document.querySelector('.credit-card');
        const activationButton = document.querySelector('.card-activation-button');
        
        if (creditCard && activationButton) {
            // Add floating animation to the card
            gsap.to(creditCard, {
                y: -10,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
            
            // Add pulse glow effect to the card
            const glowTimeline = gsap.timeline({repeat: -1, repeatDelay: 2});
            glowTimeline.to(creditCard, {
                boxShadow: '0 15px 40px rgba(46, 125, 50, 0.4)',
                duration: 1,
                ease: "sine.inOut"
            })
            .to(creditCard, {
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                duration: 1,
                ease: "sine.inOut"
            });
            
            // Add click event to activation button
            activationButton.addEventListener('click', () => {
                // Rotate the card several times quickly
                gsap.to(creditCard, {
                    rotationY: '+=1080',
                    duration: 2,
                    ease: "power2.inOut",
                    onComplete: () => {
                        // Show success message
                        const successMessage = document.createElement('div');
                        successMessage.classList.add('card-success-message');
                        successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Carte activée avec succès!';
                        
                        activationButton.parentNode.insertBefore(successMessage, activationButton.nextSibling);
                        activationButton.textContent = 'Carte activée';
                        activationButton.disabled = true;
                        activationButton.style.backgroundColor = '#4CAF50';
                        
                        // Animate success message appearance
                        gsap.from(successMessage, {
                            opacity: 0,
                            y: 20,
                            duration: 0.5,
                            ease: "back.out(1.7)"
                        });
                        
                        // Add special glow effect to the card after activation
                        gsap.to(creditCard.querySelector('.card-front'), {
                            boxShadow: '0 0 30px rgba(129, 199, 132, 0.7)',
                            duration: 0.5,
                            repeat: 3,
                            yoyo: true
                        });
                    }
                });
                
                // Play a success sound with error handling
                const activationSound = new Audio('https://cdn.freesound.org/previews/320/320652_5260872-lq.mp3');
                activationSound.volume = 0.3;
                activationSound.play().catch(e => console.log("Activation sound play failed:", e));
            });
        }
    };
    
    setupCreditCardAnimation();
});
