// Menu tings
const navMenuItems = [
    { name: "Home", href: "../../index.html" },
    { name: "Data Visualization", href: "./Information/data.html" },
    { name: "Design and Research", href: "./Design/design&research.html" },
    { name: "Theory", href: "./Theory/theory.html"},
    { name: "About", href: "./About/about.html" }
];

// Method for the Menu Items
function CreateMenuItems() {
    //selecting my nav tag 
    const nav = document.querySelector('nav');
    const logo = document.createElement('img');
    logo.src = '../Images/LAMBO LOGOO.png'; // Path to your logo image
    logo.alt = 'Logo'; // Alt text for accessibility
    logo.id = 'nav-logo';
    const ul = document.createElement('ul');

    ul.id = 'nav-links';


    //will iterate through my array, and create a list of hyperlinks for my nav
    navMenuItems.forEach(element => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = element.name;
        a.href = element.href;
        a.addEventListener('click', (event) => {
            window.location.href = element.href;
        });

        //add hyperlinks to my list 
        li.appendChild(a);
        a.classList.add('nav-link');
        ul.appendChild(li);
    });

    //lastly the list should get added to the nav element
    nav.appendChild(ul);
    nav.appendChild(logo);
}
 
document.addEventListener ('DOMContentLoaded',CreateMenuItems);