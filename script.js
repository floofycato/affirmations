const gradients = [
  'linear-gradient(135deg, #1e1e1e, #3c3c3c)',
  'linear-gradient(135deg, #ffafbd, #ffc3a0)',
  'linear-gradient(135deg, #2193b0, #6dd5ed)',
  'linear-gradient(135deg, #cc2b5e, #753a88)',
  'linear-gradient(135deg, #ee9ca7, #ffdde1)',
  'linear-gradient(135deg, #42275a, #734b6d)',
  'linear-gradient(135deg, #373b44, #4286f4)',
];

function getRandomGradient() {
  return gradients[Math.floor(Math.random() * gradients.length)];
}

async function getAffirmation() {
  const proxyUrl = 'https://api.allorigins.win/get?url=';
  const targetUrl = 'https://www.affirmations.dev/';
  const uniqueUrl = `${proxyUrl}${encodeURIComponent(targetUrl)}&random=${Math.random()}`;
  
  const response = await fetch(uniqueUrl);
  
  if (!response.ok) throw new Error('Network response was not ok.');
  
  const data = await response.json();
  const affirmation = JSON.parse(data.contents).affirmation;
  return affirmation;
}

document.getElementById('affirmationButton').addEventListener('click', async () => {
  const affirmationElement = document.getElementById('affirmation');
  const errorElement = document.getElementById('error');
  affirmationElement.classList.remove('show');
  affirmationElement.innerText = 'Loading...';
  errorElement.innerText = '';

  try {
    const affirmation = await getAffirmation();
    affirmationElement.innerText = affirmation;
    document.body.style.background = getRandomGradient();
    setTimeout(() => {
      affirmationElement.classList.add('show');
    }, 100);  // Delay to allow the removal of 'show' class to take effect
  } catch (error) {
    affirmationElement.innerText = '';
    errorElement.innerText = 'Failed to fetch affirmation. Please try again.';
  }
});