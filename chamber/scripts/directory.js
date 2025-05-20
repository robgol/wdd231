const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("article");

// The following code could be written cleaner. How? We may have to simplfiy our HTMl and think about a default view.

gridbutton.addEventListener("click", () => {
	// example using arrow function
	display.classList.add("grid");
	display.classList.remove("list");
});

listbutton.addEventListener("click", showList); // example using defined function

function showList() {
	display.classList.add("list");
	display.classList.remove("grid");
}


async function loadMembers() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error('Failed to load member data');

    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error('Error:', error);
  }
}

function displayMembers(members) {
  const container = document.getElementById('directory');
  container.innerHTML = ''; // Clear existing content

  members.forEach(member => {
    const section = document.createElement('section');
    section.innerHTML = `
      <img src="images/logo.jpg" alt="${member.name} logo" width="100" />
      <h3>${member.name}</h3>
      <p><strong>Address:</strong> ${member.address}</p>
      <p>${member.phone}</p>
      <p><a href="${member.website}" target="_blank">${member.website}</a></p>
    `;
    container.appendChild(section);
  });
}

// Load the members when the page loads
loadMembers();
