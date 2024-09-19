var socket = io.connect("http://localhost:8080", { forceNew: true });

socket.on("messages", function(data) {
    console.log(data);
    render(data);
});

function render(data) {
    var html = data.map(function(elem) {
        return `<div>
                <strong>${escapeHtml(elem.author)}</strong>:
                <em>${escapeHtml(elem.text)}</em>
              </div>`;
    }).join(" ");
    
    document.getElementById("messages").innerHTML = html;
}

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function addMessage(e) {
    e.preventDefault(); // Prevenir la recarga de la página
    var message = {
        author: document.getElementById("username").value,
        text: document.getElementById("texto").value,
    };
    socket.emit("new-message", message);
    document.getElementById("texto").value = ''; // Limpiar el campo de texto
    return false;
}
