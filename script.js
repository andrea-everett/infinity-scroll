const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');


// Unsplash API
const count = 5;
const apiKey = 'mQcja2suy4xbW7cvAdTF9eaX1Of1v0PwMF3yAn_xJQs ';
const apiUrl = 'https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}';


// Help Fuction
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}
// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
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

// On Load
getPhotos();