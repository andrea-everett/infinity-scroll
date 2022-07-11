const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready =false;
let imagesLoaded = 0;
let totalImages = 0;


// Unsplash API
const count = 30;
const apiKey = `mQcja2suy4xbW7cvAdTF9eaX1Of1v0PwMF3yAn_xJQs`;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

// Help Fuction
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}
// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        const item = document.createElement ('a');
        // item.setAttribute('href' , photo.links.html);
        // item.setAttribute('target' , '_blank');
        // Create img for photo
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // Create image for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

    // Event Listener, check when each is finished loading 
    img.addEventListener('load', imageLoaded);
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API
async function getPhotos() {
    try {
            const response = await fetch(apiUrl);
            photosArray = await response.json();
            displayPhotos();
    } catch (error) {
        // Catch Error Here
    }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
   if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
       ready === false;
    getPhotos();
   }
})

// On Load
getPhotos();