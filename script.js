document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-list a');

    // Toggle navigation menu on mobile
    navToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
    });

    // Close nav menu when a link is clicked (for smooth scrolling)
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = e.target.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }

            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
            }
        });
    });

    // Optional: Add a subtle animation/reveal on scroll for sections
    const sections = document.querySelectorAll('.section');
    const options = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            } else {
                // Optional: reset if out of view to re-trigger on scroll back
                // entry.target.style.opacity = 0;
                // entry.target.style.transform = 'translateY(20px)';
            }
        });
    }, options);

    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });

    // --- Discord Webhook Application Logic ---
    const applicationForm = document.getElementById('applicationForm');
    const formMessage = document.getElementById('formMessage');

    if (applicationForm) {
        applicationForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1392222893332500520/GYbcA-yjBp5MrDGDcLSJQLpvUVr5gHRt1aVnzIonqZrYCycj6W71Mk5g18-pOgYOUxJ1'; // <<< REPLACE THIS

            if (DISCORD_WEBHOOK_URL === 'YOUR_DISCORD_WEBHOOK_URL_HERE' || !DISCORD_WEBHOOK_URL) {
                formMessage.textContent = 'Error: Discord Webhook URL not configured. Please open script.js and add your webhook URL.';
                formMessage.style.color = 'red';
                return;
            }

            const applicantName = document.getElementById('applicantName').value;
            const applicantEmail = document.getElementById('applicantEmail').value;
            const discordTag = document.getElementById('discordTag').value;
            const age = document.getElementById('age').value;
            const fivemExperience = document.getElementById('fivemExperience').value;
            const securityExperience = document.getElementById('securityExperience').value;
            const whyHeroSecurity = document.getElementById('whyHeroSecurity').value;
            const strengthsWeaknesses = document.getElementById('strengthsWeaknesses').value;
            const scenarioResponse = document.getElementById('scenarioResponse').value;

            const embed = {
                title: "New Hero Security Application!",
                description: `A new application has been submitted by **${applicantName}**!`,
                color: 65280, // Hex color code for green (0x00FF00)
                timestamp: new Date().toISOString(),
                fields: [
                    { name: "Applicant Name", value: applicantName, inline: true },
                    { name: "Email", value: applicantEmail, inline: true },
                    { name: "Discord Tag", value: discordTag, inline: true },
                    { name: "Age", value: age, inline: true },
                    { name: "FiveM Experience", value: fivemExperience.substring(0, 1024) },
                    { name: "Security/Combat Experience", value: securityExperience.substring(0, 1024) },
                    { name: "Why Hero Security?", value: whyHeroSecurity.substring(0, 1024) },
                    { name: "Strengths & Weaknesses", value: strengthsWeaknesses.substring(0, 1024) },
                    { name: "Scenario Response", value: scenarioResponse.substring(0, 1024) }
                ],
                footer: {
                    text: "Hero Security Applications"
                }
            };

            try {
                const response = await fetch(DISCORD_WEBHOOK_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        embeds: [embed]
                    }),
                });

                if (response.ok) {
                    formMessage.textContent = 'Application submitted successfully! We will be in touch shortly.';
                    formMessage.style.color = 'var(--primary-color)'; // Use CSS variable
                    applicationForm.reset();
                } else {
                    const errorText = await response.text();
                    console.error('Discord Webhook Error:', response.status, errorText);
                    formMessage.textContent = 'Error submitting application. Please try again or contact us directly on Discord.';
                    formMessage.style.color = 'red';
                }
            } catch (error) {
                console.error('Fetch Error:', error);
                formMessage.textContent = 'Network error or unable to connect. Please check your internet connection or try again later.';
                formMessage.style.color = 'red';
            }
        });
    }

    // --- Test Fill Button Logic ---
    const testFillBtn = document.getElementById('testFillBtn');

    if (testFillBtn) {
        testFillBtn.addEventListener('click', () => {
            document.getElementById('applicantName').value = 'Test Applicant';
            document.getElementById('applicantEmail').value = 'test@example.com';
            document.getElementById('discordTag').value = 'TestUser#0000';
            document.getElementById('age').value = 25;
            document.getElementById('fivemExperience').value = 'Extensive FiveM experience, over 1000 hours in various roles, familiar with security operations and roleplay etiquette.';
            document.getElementById('securityExperience').value = 'Former private security contractor in-game, specialized in VIP protection and asset recovery. Real-life background in tactical simulation training.';
            document.getElementById('whyHeroSecurity').value = 'I am highly impressed by Hero Security\'s reputation for professionalism and advanced tactics. I believe my skills align perfectly with your mission to provide top-tier security solutions.';
            document.getElementById('strengthsWeaknesses').value = 'Strengths: Excellent communication, quick decision-making under pressure, proficient in tactical maneuvers. Weaknesses: Can sometimes be over-analytical, but working on faster intuitive responses.';
            document.getElementById('scenarioResponse').value = 'Upon witnessing the ambush, my immediate action would be to assess the threat level and secure the client. I would establish a defensive perimeter, use suppressive fire if necessary, and call for immediate backup. My strategy would prioritize client extraction to a secure location, minimizing collateral damage, and ensuring all threats are neutralized efficiently.';
            formMessage.textContent = 'Form filled with test data!';
            formMessage.style.color = 'var(--secondary-color)'; // Give it a blue color
        });
    }
});