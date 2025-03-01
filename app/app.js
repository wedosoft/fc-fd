document.addEventListener("DOMContentLoaded", function () {
    console.log("App loaded successfully");
    app.initialized().then(
      function (_client) {
        window.client = _client;
        console.log("Client initialized");
  
        client.instance.context().then(
          function (context) {
            console.log("Context received:", context);
            renderData(context.error, context.data);
          },
          function (error) {
            console.error("Failed to get context:", error.message);
            showError("Failed to get context: " + error.message);
          }
        );
      },
      function (error) {
        console.error("Failed to initialize app:", error.message);
        showError("Failed to initialize app: " + error.message);
      }
    );
  });
  
  function renderData(error, data) {
    if (error) {
      showError("Error: " + error.message);
    } else if (data.contact) {
      showResult(`Name: ${data.contact.name}\nEmail: ${data.contact.email || "N/A"}`);
    } else {
      showResult(data.message);
    }
  }
  
  function showResult(message) {
    document.getElementById("result").innerText = message;
  }
  
  function showError(message) {
    document.getElementById("result").innerText = message;
  }