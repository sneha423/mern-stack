// a Promise is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
// A Promise can be in one of three states:
// Pending: The initial state; the asynchronous operation has not yet completed.
// Fulfilled (or Resolved): The operation completed successfully, and the promise now holds a resulting value.
// Rejected: The operation failed, and the promise holds a reason for the failure (an error).
//promises are generally consumed(rarely created by us)
//example:
//  basic syntax:fetch('https://something.com').then().catch().finally()

//firstly we will learn to create promise
const promiseOne = new Promise(function (resolve, reject) {
  //do an async tak
  //DB calls,cryptography,network calls
  setTimeout(function () {
    console.log("async task 1 is complete");
    resolve(); //this calls the consumption part of promise
  }, 1000);
});
//to consume promise
//then has direct relation to resolve part of promise
promiseOne.then(function () {
  //values are returned here
  console.log("promise 1 consumed");
});

const promiseTwo = new Promise(function (resolve, reject) {
  setTimeout(function () {
    console.log("async task 2 is complete");
    resolve();
  }, 1000);
});
promiseTwo.then(function () {
  //values are returned here
  console.log("promise 2 consumed");
});

//data consumption in promise
const promiseThree = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve({ username: "sneha", email: "sneha.com" });
  }, 1000);
});
promiseThree.then(function (user) {
  console.log(user);
});

//concept of error in promise
const promiseFour = new Promise(function (resolve, reject) {
  setTimeout(function () {
    let error = true;
    // let error = false;
    if (!error) {
      resolve({ username: "amita", password: "123" });
    } else {
      reject("error:something went wrong");
    }
  });
});
//catch is used for fetching errors
promiseFour
  .then((user) => {
    return user.username;
  })
  .then((username) => {
    //chaining concept(IMP):uing .then() again and again
    //finally executes no matter what
    console.log(username);
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(() => {
    console.log("task finally done!");
  });

//to use async await in promise
//async await can't handle errors directly
//we have to use try and catch for errors
const promiseFive = new Promise(function (resolve, reject) {
  setTimeout(function () {
    let error = true;
    // let error = false;
    if (!error) {
      resolve({ username: "amita", password: "123" });
    } else {
      reject("error:JS went wrong");
    }
  });
});
async function consumeFive() {
  try {
    const response = await promiseFive;
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
consumeFive();

// async function getallUsers() {
//   try {
//     const response = await fetch("https://jsonplaceholder.typicode.com/users");
//     //we have to await response from json too as it can take some time
//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.log("E:", error);
//   }
// }
//getallUsers();

//now to write same function in then and actch terms in this we don't have to wait for any response the next then will execute only if previous then is done
fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log("E:", error);
  });


