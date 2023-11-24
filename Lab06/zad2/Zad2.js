function addContact() {
    var nameInput = document.getElementById('name');
    var phoneInput = document.getElementById('phone');

    if (validateName(nameInput.value) && validatePhone(phoneInput.value)) {
        var contactList = document.getElementById('contactList');
        var contactDiv = document.createElement('div');
        contactDiv.className = 'contact';

        var contactName = document.createElement('span');
        contactName.textContent = nameInput.value + ' ';

        var contactPhone = document.createElement('span');
        contactPhone.textContent = phoneInput.value;

        var deleteButton = document.createElement('button');
        deleteButton.innerHTML = '&#128465;';
        deleteButton.onclick = function() {
            contactDiv.remove();
        };

        contactDiv.appendChild(contactName);
        contactDiv.appendChild(contactPhone);
        contactDiv.appendChild(deleteButton);

        contactList.appendChild(contactDiv);

        nameInput.value = '';
        phoneInput.value = '';
    } else {
        alert('Niepoprawne dane. Sprawdź wprowadzone informacje.');
    }
}

function validateName(name) {
    var nameRegex = /^[A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż-]+$/;
    return nameRegex.test(name);
}

function validatePhone(phone) {
    var phoneRegex = /^[+]?[0-9 -]{9,12}$/;
    return phoneRegex.test(phone);
}