// Querying form elements
const form = document.querySelector('#form')
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const cpassword = document.querySelector('#cpassword');

// Event listener for form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();  

    // Validate inputs
    if (validateInputs()) {
        submitForm();
    }
})

// Function to validate form inputs
function validateInputs() {
    const usernameVal = username.value.trim();
    const emailVal = email.value.trim();
    const passwordVal = password.value.trim();
    const cpasswordVal = cpassword.value.trim();
    let success = true;

    // Validate username
    if (usernameVal === '') {
        success = false;
        setError(username, 'Username is required');
    } else {
        setSuccess(username);
    }

    // Validate email
    if (emailVal === '') {
        success = false;
        setError(email, 'Email is required');
    } else if (!validateEmail(emailVal)) {
        success = false;
        setError(email, 'Please enter a valid email');
    } else {
        setSuccess(email);
    }

    // Validate password
    if (passwordVal === '') {
        success = false;
        setError(password, 'Password is required');
    } else if (passwordVal.length < 8) {
        success = false;
        setError(password, 'Password must be at least 8 characters long');
    } else {
        setSuccess(password);
    }

    // Validate confirm password
    if (cpasswordVal === '') {
        success = false;
        setError(cpassword, 'Confirm password is required');
    } else if (cpasswordVal !== passwordVal) {
        success = false;
        setError(cpassword, 'Password does not match');
    } else {
        setSuccess(cpassword);
    }

    return success;
}

// Function to set error message for an input field
function setError(element, message) {
    const inputGroup = element.parentElement;
    const errorElement = inputGroup.querySelector('.error');

    errorElement.innerText = message;
    inputGroup.classList.add('error');
    inputGroup.classList.remove('success');
}

// Function to set success state for an input field
function setSuccess(element) {
    const inputGroup = element.parentElement;
    const errorElement = inputGroup.querySelector('.error');

    errorElement.innerText = '';
    inputGroup.classList.add('success');
    inputGroup.classList.remove('error');
}

// Function to validate email format
const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

// Function to submit form data to the API
function submitForm() {
    const usernameVal = username.value.trim();
    const passwordVal = password.value.trim();

    fetch('http://localhost:3000/collect', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: usernameVal, password: passwordVal })
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('responseMessage').innerText = data.message;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Theme switcher functionality
const switcher = document.querySelector('.btn');
switcher.addEventListener('click', function () {
    document.body.classList.toggle('light-theme');
    document.body.classList.toggle('dark-theme');

    const className = document.body.className;
    if (className == "light-theme") {
        this.textContent = "Dark";
    } else {
        this.textContent = "Light";
    }

    console.log('current class name: ' + className);
});

// Image gallery functionality
const IMAGE0 = "https://img.freepik.com/free-photo/office-skyscrapers-business-district_107420-95733.jpg?t=st=1714741887~exp=1714745487~hmac=2174fc14c2ba9c714c32e6d89eff3a23c614c4bc265e23778ba089b985d8b82e&w=1380";
const IMAGE1 = "https://img.freepik.com/free-photo/observation-urban-building-business-steel_1127-2397.jpg?t=st=1714741899~exp=1714745499~hmac=b84d5dfc41bdbf6f37f153657b009bec5a3c140445db7a17a3f8d6c65b00a703&w=1380";
const IMAGE2 = "https://img.freepik.com/free-photo/boston-city-skyline-with-prudential-tower-urban-skyscrapers-charles-river_649448-1132.jpg?t=st=1714741919~exp=1714745519~hmac=a974c5f0d47f2532c0e5ffa0a8a38df46af95886ba66db1f82ad91e45dc2dd92&w=1380";
const IMAGE3 = "https://img.freepik.com/free-photo/high-rise-buildings-blue-sky-shinjuku-tokyo_1339-6973.jpg?t=st=1714741952~exp=1714745552~hmac=2aa57d58f3dff870c1d68dc8284884cd635bd8cff3d682665030bc049d47fae7&w=1380";

const images = [IMAGE0, IMAGE1, IMAGE2, IMAGE3];
const image0 = document.getElementById("image0");
const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const image3 = document.getElementById("image3");

const lightbox = document.getElementById("lightbox");
const previewImg = document.getElementById("preview-image");
const modalImagesBlock = document.getElementById("modal-images-block");

image0.src = IMAGE0;
image1.src = IMAGE1;
image2.src = IMAGE2;
image3.src = IMAGE3;

let activeId = null;
previewImg.src = images[0];

const modalImagesElements = modalImagesBlock.getElementsByTagName("img");
const modalImages = Object.values(modalImagesElements);

modalImages.forEach((imageElement, i) => {
    console.log(imageElement);
    imageElement.src = images[i];
});

function openModal(imgId) {
    if (activeId !== null) {
        modalImages[activeId].classList.remove("active");
    }

    activeId = imgId;
    lightbox.classList.add("visible");
    previewImg.src = images[imgId];
    modalImages[imgId].classList.add("active");
}

function closeModal() {
    lightbox.classList.remove("visible");
}

function control(direction) {
    const prevId = activeId;
    if (direction === 1) {
        // next
        activeId =
            activeId + 1 > images.length - 1
                ? // then go to the beginning
                  (activeId = 0)
                : (activeId = activeId + 1);
    } else {
        // previous
        activeId =
            activeId - 1 < 0
                ? // then go to the end
                  (activeId = images.length - 1)
                : activeId - 1;
    }

    previewImg.src = images[activeId];
    modalImages[activeId].classList.add("active");
    modalImages[prevId].classList.remove("active");
}
