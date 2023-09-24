

// global elements
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');


// functions
const login = async (email, password) => {
  const serverUrl = 'http://localhost:8080/user/login';

  try {
    const res = await axios.post(serverUrl, {
      email: email,
      password: password
    }).then((res) => {
      const displayMessage = document.getElementById('name');

      displayMessage.textContent = "Welcome " + res.data.firstName;

    });

  } catch(err){
    console.error('Error:', err);
  }
};

const register = async (email, password, name) => {
  const serverUrl = 'http://localhost:8080/user/register';


  try{
    const res = await axios.post(serverUrl, {
      email: email,
      password: password,
      name: name
    }).then((res) => {
      const displayMessage = document.getElementById('message');

      displayMessage.textContent = 'User created!';
    });

  } catch(err){
    console.error('Error:', err);
  }
};


//event-listeners
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  login(email, password);
});

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  const firstName = document.getElementById('register-firstName').value;
  const lastName = document.getElementById('register-lastName').value;

  const name = [firstName, lastName]

  register(email, password, name);
});
