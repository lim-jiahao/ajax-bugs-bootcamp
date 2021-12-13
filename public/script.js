const loginContainer = document.getElementById('login-container');
const userName = document.getElementById('username');
const password = document.getElementById('password');
const email = document.getElementById('email');
const loginBtn = document.getElementById('login-button');
const registerBtn = document.getElementById('register-button');
const loginWarning = document.getElementById('warning2');

const dashboardContainer = document.getElementById('dashboard');
const loggedInAs = document.getElementById('logged-in-as');
const logout = document.getElementById('logout');

const problem = document.getElementById('problem');
const errorText = document.getElementById('error-text');
const commit = document.getElementById('commit');
const radioContainer = document.getElementById('radio-buttons');
const submitBtn = document.getElementById('submit');
const warning = document.getElementById('warning');
const bugList = document.getElementById('bug-list');

const featureInput = document.getElementById('feature');
const featureSubmit = document.getElementById('submit-feature');

let user = '';

const checkCookies = () => {
  const cookieValue = document.cookie.split('; ');
  const loggedIn = cookieValue.find((row) => row.startsWith('loggedIn='))?.split('=')[1];

  if (loggedIn === 'true') {
    // eslint-disable-next-line prefer-destructuring
    user = cookieValue.find((row) => row.startsWith('username='))
      .split('=')[1];
    loginContainer.style.display = 'none';
    dashboardContainer.style.display = 'block';
    loggedInAs.innerText = `Logged in as: ${user}`;
  }
};

const getFeatures = async () => {
  try {
    const resp = await axios.get('/feature');
    const { features } = resp.data;
    features.forEach((feature) => {
      const radioDiv = document.createElement('div');
      const label = document.createElement('label');
      label.innerText = feature.name;
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'features-group';
      input.value = feature.name;
      input.checked = true;
      radioDiv.append(input);
      radioDiv.append(label);
      radioContainer.append(radioDiv);
    });
  } catch (error) {
    console.log(error);
  }
};

const getBugs = async () => {
  try {
    const resp = await axios.get('/bug');
    const { bugs } = resp.data;
    bugs.forEach((bug) => {
      const div = document.createElement('div');
      const p1 = document.createElement('p');
      p1.innerText = `Problem: ${bug.problem}`;
      const p2 = document.createElement('p');
      p2.innerText = `Error Text: ${bug.errorText}`;
      const p3 = document.createElement('p');
      p3.innerText = `Commit: ${bug.commit}`;
      const p4 = document.createElement('p');
      p4.innerText = `Feature: ${bug.feature.name}`;
      const p5 = document.createElement('p');
      p5.innerText = `By User: ${bug.user.name}`;

      div.appendChild(p1);
      div.appendChild(p2);
      div.appendChild(p3);
      div.appendChild(p4);
      div.appendChild(p5);
      bugList.appendChild(div);
      const element = document.createElement('hr');
      bugList.appendChild(element);
    });
  } catch (error) {
    console.log(error);
  }
};

checkCookies();
getFeatures();
getBugs();

submitBtn.addEventListener('click', async () => {
  if (!problem.value || !errorText.value || !commit.value) {
    warning.innerText = 'Please fill in all fields!';
    return;
  }

  warning.innerText = '';
  const data = {
    problem: problem.value,
    errorText: errorText.value,
    commit: commit.value,
    feature: document.querySelector('input[name="features-group"]:checked').value,
    username: user,
  };

  try {
    // eslint-disable-next-line no-undef
    const resp = await axios.post('/bug', data);
    const div = document.createElement('div');
    const p1 = document.createElement('p');
    p1.innerText = `Problem: ${resp.data.item.problem}`;
    const p2 = document.createElement('p');
    p2.innerText = `Error Text: ${resp.data.item.errorText}`;
    const p3 = document.createElement('p');
    p3.innerText = `Commit: ${resp.data.item.commit}`;
    const p4 = document.createElement('p');
    p4.innerText = `Feature: ${resp.data.feature}`;
    const p5 = document.createElement('p');
    p5.innerText = `By User: ${user}`;

    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(p3);
    div.appendChild(p4);
    div.appendChild(p5);
    bugList.appendChild(div);
    const element = document.createElement('hr');
    bugList.appendChild(element);

    problem.value = '';
    errorText.value = '';
    commit.value = '';
  } catch (error) {
    // handle error
    console.log(error);
  }
});

featureSubmit.addEventListener('click', async () => {
  const data = {
    feature: featureInput.value,
  };

  try {
    const resp = await axios.post('/feature', data);
    const radioDiv = document.createElement('div');
    const label = document.createElement('label');
    label.innerText = resp.data.feature.name;
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'features-group';
    input.value = resp.data.feature.name;
    input.checked = true;
    radioDiv.append(input);
    radioDiv.append(label);
    radioContainer.append(radioDiv);
    featureInput.value = '';
  } catch (error) {
    // handle error
    console.log(error);
  }
});

loginBtn.addEventListener('click', async () => {
  const data = {
    name: userName.value,
    email: email.value,
    password: password.value,
  };

  try {
    const resp = await axios.post('/login', data);
    if (resp.data !== 'Invalid credentials!') {
      loginContainer.style.display = 'none';
      dashboardContainer.style.display = 'block';
      loggedInAs.innerText = `Logged in as: ${resp.data.user.name}`;
      user = resp.data.user.name;
      userName.value = '';
      email.value = '';
      password.value = '';
      loginWarning.innerText = '';
    } else {
      loginWarning.innerText = 'Please check your details and try again!';
    }
  } catch (error) {
    console.log(error);
  }
});

registerBtn.addEventListener('click', async () => {
  if (!userName.value || !email.value || !password.value) {
    loginWarning.innerText = 'Please fill in all fields!';
    return;
  }

  const data = {
    name: userName.value,
    email: email.value,
    password: password.value,
  };

  try {
    const resp = await axios.post('/register', data);
    if (resp.data !== 'User exists') {
      loginContainer.style.display = 'none';
      dashboardContainer.style.display = 'block';
      loggedInAs.innerText = `Logged in as: ${resp.data.user.name}`;
      user = resp.data.user.name;
      userName.value = '';
      email.value = '';
      password.value = '';
      loginWarning.innerText = '';
    } else {
      loginWarning.innerText = 'User already exists!';
    }
  } catch (error) {
    console.log(error);
  }
});

logout.addEventListener('click', async () => {
  try {
    const resp = await axios.get('/logout');
    loginContainer.style.display = 'flex';
    dashboardContainer.style.display = 'none';
    user = '';
    loggedInAs.innerText = '';
  } catch (error) {
    console.log(error);
  }
});
