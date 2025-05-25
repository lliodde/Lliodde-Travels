document.addEventListener("DOMContentLoaded", () => {
    console.log("About page script loaded!");

    // Smooth scrolling for navigation links
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // Animated introduction text
    const aboutTitle = document.querySelector(".about-hero-content h1");
    aboutTitle.style.opacity = "0";
    aboutTitle.style.transform = "translateY(20px)";
    
    setTimeout(() => {
        aboutTitle.style.transition = "opacity 1s ease, transform 1s ease";
        aboutTitle.style.opacity = "1";
        aboutTitle.style.transform = "translateY(0)";
    }, 500);

    // Highlight team members on hover
    document.querySelectorAll(".team-member").forEach(member => {
        member.addEventListener("mouseenter", () => {
            member.style.transform = "scale(1.05)";
            member.style.transition = "transform 0.3s ease-in-out";
        });
        member.addEventListener("mouseleave", () => {
            member.style.transform = "scale(1)";
        });
    });
});
