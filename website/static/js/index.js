import {uploadFileToFireStore} from "./fire.js";

const editBtn = document.querySelector('.edit-avatar-btn');
const avatarInput = document.getElementById('avatar');
const avatarEl = document.querySelector('.avatar');
const closeTopBtn = document.querySelector('.close-top-btn');
const navBar = document.querySelector('.left-nav-bar');
editBtn.addEventListener('click', () => {
    avatarInput.click();
})

const updateAvatarBtn = document.querySelector('#update-avatar-btn');
updateAvatarBtn.style.display = 'none';
let avatarFIle = null;
avatarInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    avatarFIle = file;
    const reader = new FileReader();
    reader.onload = () => {
        const result = reader.result;
        avatarEl.src = result;
        updateAvatarBtn.style.display = 'block';
    }
    reader.readAsDataURL(file);
})

updateAvatarBtn.addEventListener('click', async () => {
    updateAvatarBtn.textContent = 'Updating...';
    updateAvatarBtn.disabled = true;
    if (!avatarFIle) {
        console.log('No file selected');
        return
    }
    const newAvatarUrl = await uploadFile(avatarFIle);
    if (!newAvatarUrl) {
        console.log('Upload failed');
        return
    }
    //update avatar url in database
    try {
        const response = await fetch(`/users/update/avatar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatarUrl: newAvatarUrl,
            })
        });
        if (response.status === 200) {

        }
    } catch (err) {
        console.log(err);
    } finally {
        avatarFIle = null;
        updateAvatarBtn.textContent = 'Save';
        updateAvatarBtn.disabled = false;
        window.location.reload();
    }

})

async function uploadFile(file) {
    try {
        const url = await uploadFileToFireStore(file);
        return url;
    } catch (error) {
        console.log(error);
        return null;
    }
}


window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
        closeTopBtn.style.display = 'block';

    } else {
        closeTopBtn.style.display = 'none';
        navBar.classList.remove('close');
        closeTopBtn.innerHTML = '&times;';
    }
});

closeTopBtn.addEventListener('click', () => {
    navBar.classList.toggle('close');
    closeTopBtn.innerHTML = navBar.classList.contains('close') ? '&#9776;' : '&times;';
});