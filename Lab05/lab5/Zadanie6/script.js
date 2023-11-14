
fetch('user.json')
  .then(response => response.json())
  .then(users => {
    const usersDiv = document.createElement('div');
    usersDiv.className = 'users';

    users.forEach(user => {
      const userDiv = document.createElement('div');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
          addressDiv.style.display = 'block';
          phoneDiv.style.display = 'block';
        } else {
          addressDiv.style.display = 'none';
          phoneDiv.style.display = 'none';
        }
      });

      const nameDiv = document.createElement('div');
      nameDiv.textContent = `${user.firstName} ${user.lastName}`;

      const addressDiv = document.createElement('div');
      addressDiv.style.display = 'none';
      addressDiv.textContent = `${user.Address.Street}, ${user.Address.City}, ${user.Address.Country || user.Address.State}`;
      
      const phoneDiv = document.createElement('div');
      phoneDiv.style.display = 'none';
      phoneDiv.textContent = `${user.email}, ${user.phone}`;
      userDiv.appendChild(checkbox);
      userDiv.appendChild(nameDiv);
      userDiv.appendChild(addressDiv);
      userDiv.appendChild(phoneDiv);

      usersDiv.appendChild(userDiv);
    });

    document.body.appendChild(usersDiv);
  });
