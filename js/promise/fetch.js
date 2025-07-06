//now we will talk about fetch properly
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

  //for fetch there is a special queue: fetch queue/microtask queue/priority queue
  //it executes first if timing is clashing in two processes
  //fetch divides work in 2 parts
//   first is handling browser part
//   other is handling variables and memory part
//if response comes on the request it comes in response or onFulfilled array (even the errors like 404 come in this as they come only when our request is fulfilled)
//if request is not accepted then it goes in on rejection array
//data contain these two arrays which are private to fetch we can't access data directly from them
//then data gives the desired value to response in memorys