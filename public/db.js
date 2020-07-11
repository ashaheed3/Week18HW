let db;

const request = window.indexedDB.open("budget", 1);


request.onupgradeneeded = function(event) {
  

 db = event.target.result;

  const pendingStore = db.createObjectStore("pending", {
    autoIncrement: true
  });
};

request.onsuccess = function(event) {
  db = event.target.result;

  if (navigator.onLine) {
    checkDatabase();
  }
};

request.onerror = function(event) {
  /
};

function saveRecord(record) {
  
    db = request.result;
    transaction = db.transaction(["pending"], "readwrite");
    pendingStore = transaction.objectStore("pending");
        
 
  pendingStore.add(record);
  
}

function checkDatabase() {
  // open a transaction on your pending db
  // access your pending object store
  // get all records from store and set to a variable

  getAll.onsuccess = function() {
    if (getAll.result.length > 0) {
      fetch("/api/transaction/bulk", {
        method: "POST",
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then(() => {
          // if successful, open a transaction on your pending db
          // access your pending object store
          // clear all items in your store
      });
    }
  };
}

// listen for app coming back online
window.addEventListener("online", checkDatabase);