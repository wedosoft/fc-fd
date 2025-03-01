exports = {
    onCallCreateHandler: function (payload) {
      console.log("onCallCreate event triggered with payload:", payload);
      const callerNumber = payload.data.caller_number;
      const freshdeskDomain = payload.iparams.freshdesk_domain;
      const apiKey = payload.iparams.freshdesk_api_key;
  
      if (!callerNumber) {
        renderData(null, { message: "No caller number available" });
        return;
      }
  
      $request.invoke(
        `https://${freshdeskDomain}/api/v2/contacts?phone=${encodeURIComponent(callerNumber)}`,
        {
          headers: {
            Authorization: "Basic " + Buffer.from(apiKey + ":X").toString("base64"),
            "Content-Type": "application/json",
          },
        }
      ).then(
        (data) => {
          console.log("Freshdesk API response:", data.response);
          const response = JSON.parse(data.response);
          if (response.length > 0) {
            renderData(null, { contact: response[0] });
          } else {
            renderData(null, { message: "No contact found for this number" });
          }
        },
        (error) => {
          console.error("API call error:", error);
          renderData(error, null);
        }
      );
    },
  };