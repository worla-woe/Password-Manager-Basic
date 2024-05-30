const digits= [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const specials=['!','?' ,'/','_' , '-', '@', '#','$', '%','&','.'];
const lettersLowerCase=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
const lettersUpperCase=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
//generated password input
const generatedPasswordInput = document.getElementById('generatedPassword');

//password length
const passwordLength=document.querySelector('input[type=range]');

//all checkbox inputs
const allCheckboxes=document.querySelectorAll('input[type=checkbox]');

const generatePassword= (length) => {
    //update count in UI
    document.getElementById('charLengthSpan').textContent = passwordLength.value;

    //checked states
    const includeDigits=document.getElementById('includeDigits').checked;
    const Symbols=document.getElementById('Symbols').checked;
    const UpperCase=document.getElementById('UpperCase').checked;
    const LowerCase=document.getElementById('LowerCase').checked;

    //reset generated password input each time a change is made
    generatedPasswordInput.value = '';
    //reset possible characters each time function runs
    let possiblePasswordChars = [];
    //checks to add Digits
    if(includeDigits) { digits.forEach(digit => { possiblePasswordChars.push(digit)})}
    //checks to add symbols
    if(Symbols) {specials.forEach(special => possiblePasswordChars.push(special))}
    //checks to add Uppercase and automatically uses lowercase if it is not checked
    if(UpperCase) {lettersUpperCase.forEach(letter => possiblePasswordChars.push(letter))}
    else {  
          if(LowerCase) {lettersLowerCase.forEach(letter => possiblePasswordChars.push(letter))}
}
    //checks to add lowercase
    if(LowerCase) {lettersLowerCase.forEach(letter => possiblePasswordChars.push(letter))}

    for( let i=0; i<= length; i++){
        generatedPasswordInput.value += possiblePasswordChars[Math.floor(Math.random() * possiblePasswordChars.length)];

    }

}
generatePassword(passwordLength.value);

passwordLength.addEventListener('change',e => {
    let value=e.target.value;
    generatePassword(value);

});

allCheckboxes.forEach (checkbox =>{
    checkbox.addEventListener('change',() => {
        generatePassword(passwordLength.value);
    });
});
//copy password to clipboard
const copyPasswordBtn = document.getElementById('copyPassword1');
const confirmation = document.getElementById('confirmation');
copyPasswordBtn.addEventListener('click',() => {
    navigator.clipboard.writeText(generatedPasswordInput.value)
        .then(() => {
            confirmation.classList.add('active');
    setTimeout(() => {
        confirmation.classList.remove('active');
    }, 2000);
})
        .catch((error) =>{
            console.error('Error copying password to clipboard:',error);
        })
})
// Retrieve the input elements
const websiteInput = document.getElementById('website');
const storedPasswordInput = document.getElementById('storedPassword');

// Save Password Functionality
const savePasswordButton=document.getElementById('savePassword')
savePasswordButton.addEventListener('click', () => {

    const website = websiteInput.value.trim();
    const password = storedPasswordInput.value.trim();

    // Send a POST request to the backend API to save the password
    fetch('http://localhost:5000/savePassword', {
        method: 'POST',
        mode:"cors",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ website, password }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data); // Display success message
        })
        .catch((error) => {
            console.error('Error saving password:', error);
        });

    // Clear the inputs
    websiteInput.value = '';
    storedPasswordInput.value = '';
});

// Retrieve Password Functionality
const retrievePasswordButton=document.getElementById('retrievePassword')
retrievePasswordButton.addEventListener('click', () => {
    const website = websiteInput.value.trim();

    // Send a GET request to the backend API to retrieve the password
    fetch(`http://localhost:5000/retrievePassword/${website}`,{
        method: "GET",
        mode: "cors"
    })
        .then((response) => response.json())
        .then((data) => {
            const password = data.password;
            storedPasswordInput.value = password;
        
         // Display the retrieved password on the page
         const passwordMessage = document.createElement('p');
         passwordMessage.textContent = `Retrieved Password: ${password}`;
         passwordMessage.style.color = 'green';
         passwordMessage.style.fontWeight = 'bold';

         const container = document.querySelector('.container');
         container.appendChild(passwordMessage);
        })
        .catch((error) => {
            console.error('Error retrieving password:', error);
            storedPasswordInput.value = 'Password not found.';
        });
});

// Edit Password Functionality
const editPasswordButton = document.querySelector('.edit-button');
editPasswordButton.addEventListener('click', () => {
    const website = websiteInput.value.trim();
    const newPassword = storedPasswordInput.value.trim();

    // Send a PUT request to the backend API to edit the password
    fetch(`http://localhost:5000/editPassword/${website}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data); // Display success message
        })
        .catch((error) => {
            console.error('Error editing password:', error);
        });

    // Clear the inputs
    websiteInput.value = '';
    storedPasswordInput.value = '';
});

// ... (remaining code) ...

// Delete Button Click Event
const deleteButton = document.querySelector('.delete-button');
deleteButton.addEventListener('click', () => {
    const website = websiteInput.value.trim();

    // Send a DELETE request to the backend API to delete the password
    fetch(`http://localhost:5000/deletePassword/${website}`, {
        method: 'DELETE',
        mode: 'cors',
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data); // Display success message
            storedPasswordInput.value = ''; // Clear the password input
        })
        .catch((error) => {
            console.error('Error deleting password:', error);
        });
});

// Retrieve the password-manager-menu section element
const passwordManagerMenu = document.querySelector('.password-manager-menu');



// Show Password Manager Menu
const showPasswordManagerMenu = () => {
    passwordManagerMenu.style.display = 'block';
};

// Event Listener to Show Password Manager Menu
document.addEventListener('DOMContentLoaded', showPasswordManagerMenu);


