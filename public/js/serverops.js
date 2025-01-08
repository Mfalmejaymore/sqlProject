function checkNetworkStatus(url) {
  const slowNetworkTimeout = 3000; // 3 seconds
  const offlineTimeout = 10000; // 30 seconds

  // A helper to create a timeout promise
  const timeoutPromise = (timeout, message) => {
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error(message)), timeout)
    }
    );
  }

  // The fetch request
  const fetchRequest = fetch(url);

  // Check for slow network
  Promise.race([
    fetchRequest,
    timeoutPromise(slowNetworkTimeout, "slow network"),
  ])
    .catch(error => {
      if (error.message === "slow network") {
        alert("Slow network");
      }
    });

  // Check for offline
  Promise.race([
    fetchRequest,
    timeoutPromise(offlineTimeout, "you are offline"),
  ])
    .then(response => {
      if (response && response.ok) {
        console.log("Response received:", response);
      }
    })
    .catch(error => {
      if (error.message === "you are offline") {
        alert("You are offline");
      }
    });
}

// Usage
checkNetworkStatus("https://example.com"); // Replace with the target URL
