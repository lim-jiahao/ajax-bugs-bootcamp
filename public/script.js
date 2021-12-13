const btnDiv = document.createElement('div');
const btn = document.createElement('button');
btn.innerText = 'Create a bug';
document.body.appendChild(btnDiv);
btnDiv.appendChild(btn);

btn.addEventListener('click', () => {
  const formDiv = document.createElement('div');
  const problem = document.createElement('input');
  const errorText = document.createElement('input');
  const commit = document.createElement('input');
  const submitBtn = document.createElement('button');
  submitBtn.innerText = 'Submit';

  problem.placeholder = 'Problem';
  errorText.placeholder = 'Error Text';
  commit.placeholder = 'Commit';

  problem.id = 'problem';
  errorText.id = 'errorText';
  commit.id = 'commit';

  btnDiv.appendChild(formDiv);
  formDiv.appendChild(problem);
  formDiv.appendChild(errorText);
  formDiv.appendChild(commit);
  formDiv.appendChild(submitBtn);

  submitBtn.addEventListener('click', async () => {
    const data = {
      problem: problem.value,
      errorText: errorText.value,
      commit: commit.value,
    };

    try {
      // eslint-disable-next-line no-undef
      const response = await axios.post('/bug', data);

      // handle success
      const div = document.createElement('div');
      const p1 = document.createElement('p');
      p1.innerText = response.data.item.problem;
      const p2 = document.createElement('p');
      p2.innerText = response.data.item.errorText;
      const p3 = document.createElement('p');
      p3.innerText = response.data.item.commit;

      div.appendChild(p1);
      div.appendChild(p2);
      div.appendChild(p3);
      document.body.appendChild(div);
      const element = document.createElement('hr');
      document.body.appendChild(element);

      formDiv.remove();
    } catch (error) {
      // handle error
      console.log(error);
    }
  });
});
