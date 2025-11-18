async function sendMail() {
  await fetch("http://localhost:8080/participants", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      return response.json(); // parse JSON body
    })
    .then((data) => {
      const email = data._embedded.participants
        .map((participant) => participant.email)
        .reduce((a, b) => a + ", " + b);

      const subject = "Hackathon J-3";
      const body =
        "Bonjour,\n\n Rappel : le hackathon approche ...\n\nCordialement.";

      const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;
    })
    .catch((error) => console.error("Network error:", error));
}
