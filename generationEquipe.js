const el = document.getElementById("grid");

let items = document.querySelectorAll("#grid .item");
let roleOrder = Array.from(items).map((item) => item.getAttribute("data-id"));

new Sortable(grid, {
  animation: 150,
  ghostClass: "sortable-ghost",
  onEnd: () => {
    const itemAll = el.querySelectorAll(".item");
    const newOrder = Array.from(itemAll).map((item) =>
      item.getAttribute("data-id")
    );
    roleOrder = newOrder;
    console.log("New order:", newOrder);
  },
});

const teamSize = document.querySelectorAll('input[name="teamSize"]');
let currTreamSize = 3; // default value
teamSize.forEach((radio) => {
  radio.addEventListener("change", function () {
    // This runs whenever the selection changes
    console.log("Vous avez choisi : " + this.value);
    currTreamSize = this.value;
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  //const teamSize = document.getElementById("teamSize");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    await fetch("http://localhost:8080/generateTeams/" + currTreamSize, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roleOrder),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        return response.json(); // parse JSON body
      })
      .then((data) => {
        console.log("Response data:", data); // actual data from server
        const container = document.getElementById("teams");
        // Clear previous content
        container.innerHTML = "";

        // Loop through each team
        data.forEach((team, index) => {
          if (team.length === 0) return; // skip empty teams

          // Create a team block
          const teamDiv = document.createElement("div");
          teamDiv.classList.add("team");

          // Add a title
          const title = document.createElement("h3");
          title.textContent = `Team ${index + 1}`;
          teamDiv.appendChild(title);

          // Add members
          const list = document.createElement("ul");
          team.forEach((member) => {
            const li = document.createElement("li");
            li.textContent = member;
            list.appendChild(li);
          });

          teamDiv.appendChild(list);
          container.appendChild(teamDiv);
        });
      })
      .catch((error) => console.error("Network error:", error));
  });
});
