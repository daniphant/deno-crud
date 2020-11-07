# deno-crud
How it works?

Data is fetched from randomuser.me/api and mapped into an array called users when launching the server. 
All of the data manipulation done through the routes is applied to the users array and are lost when restarting, since the array will just be filled with random users at launch again.
