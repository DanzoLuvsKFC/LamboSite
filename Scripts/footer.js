// Create a dynamic footer using JavaScript
window.onload = function() {
    // Create footer element
    const footer = document.createElement('footer');
    footer.style.textAlign = "center";
    footer.style.padding = "20px";
    footer.style.backgroundColor = "#333";
    footer.style.color = "#fff";

    // Create contact information text
    const contactInfo = document.createElement('p');
    contactInfo.innerText = "Contact us at: example@example.com"; // Change this later to your contact info
    footer.appendChild(contactInfo);

    // Create a div to hold the social media icons
    const socialMediaDiv = document.createElement('div');
    socialMediaDiv.style.marginTop = "10px";

    // Social media icons
    const socialMedias = [
        { link: "https://facebook.com", imgSrc: "facebook-icon.png", altText: "Facebook" },
        { link: "https://twitter.com", imgSrc: "twitter-icon.png", altText: "Twitter" }
    ];

    // Loop through the social media array and create image links
    socialMedias.forEach(media => {
        const anchor = document.createElement('a');
        anchor.href = media.link;
        anchor.target = "_blank";  // Opens in a new tab

        const image = document.createElement('img');
        image.src = media.imgSrc;  // Link to your social media image
        image.alt = media.altText;
        image.style.width = "30px";
        image.style.margin = "0 10px";

        anchor.appendChild(image);
        socialMediaDiv.appendChild(anchor);
    });

    footer.appendChild(socialMediaDiv);

    // Append footer to the body
    document.body.appendChild(footer);
};