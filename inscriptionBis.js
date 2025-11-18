const form = document.querySelector("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  console.log("Données du formulaire :", data);

  fetch("http://localhost:8080/participants", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      alert("Inscription réussie ! Merci pour votre inscription.");
      console.log("Données du formulaire :", result);

      form.reset();
    })
    .catch((error) => {
      console.error("Erreur lors de l'inscription :", error);
      alert("Une erreur est survenue. Veuillez réessayer plus tard.");
    });
});
