document.addEventListener("DOMContentLoaded", function () {
  console.log("[DEBUG] App loaded successfully - " + new Date().toISOString());
  app.initialized().then(
    function (_client) {
      window.client = _client;
      console.log("[DEBUG] Client initialized - " + new Date().toISOString());

      client.instance.context().then(
        function (context) {
          console.log("[DEBUG] Context received:", JSON.stringify(context, null, 2));
          renderData(context.error, context.data);
        },
        function (error) {
          console.error("[DEBUG] Failed to get context:", JSON.stringify(error, null, 2));
          showError("Failed to get context: " + error.message);
        }
      );
    },
    function (error) {
      console.error("[DEBUG] Failed to initialize app:", JSON.stringify(error, null, 2));
      showError("Failed to initialize app: " + error.message);
    }
  );
});

function renderData(error, data) {
  console.log("[DEBUG] renderData called with:", {
    error: error ? JSON.stringify(error) : "null",
    data: data ? JSON.stringify(data) : "null"
  });
  
  if (error) {
    showError("Error: " + error.message);
  } else if (data.contact) {
    console.log("[DEBUG] Contact found:", JSON.stringify(data.contact, null, 2));
    showResult(`Name: ${data.contact.name}\nEmail: ${data.contact.email || "N/A"}`);
  } else {
    console.log("[DEBUG] No contact or other data:", JSON.stringify(data, null, 2));
    showResult(data.message);
  }
}

function showResult(message) {
  console.log("[DEBUG] Showing result:", message);
  document.getElementById("result").innerText = message;
}

function showError(message) {
  console.error("[DEBUG] Showing error:", message);
  document.getElementById("result").innerText = message;
}

/*
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
    */