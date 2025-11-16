fetch("http://localhost:8080/participants", {
    method: "POST",
    body: JSON.stringify({
        userId: 1,
        title: "Participants",
        name: LastName,
        first_name: FirstName, 
        mail: Mail, 
        role: Role, 
        competences: Competence,
        completed: false
    }),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})
    .then((response) => response.json())
    .then((json) => console.log(json));
    catch (error => console.error('Error', error));