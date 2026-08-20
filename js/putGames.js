const formEl = document.querySelector(".form");

formEl.addEventListener("submit", event => {
    event.preventDefault();
    const formData = new FormData(formEl);
    const data = Object.fromEntries(formData);

    if(data.id == "" || data.id < 1 || data.title == "" || data.system_id == "" || data.status_id == "") {
        $.toaster({priority : "danger", title : "Error", message: "Something went wrong :("});
    }
    else {
        fetch("https://game-collection-backend-arno.onrender.com/api/v1/game_collection/id/" + data.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
          .then(data => {
            console.log(data);
            $.toaster({priority : "success", title : "Game Modify", message: "Game details successfully modified!"});
        })
          .catch(error => console.log(error));
    }
});