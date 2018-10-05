/* global fetch*/
"use strict";
(function () {

    window.onload = loadIngredients;

    function loadIngredients() {
        var addButton = $("ingredient-add");
        addButton.onclick = addIngredient;
        retrieveIngredients();
    }

    // retrieves the ingredients currently on the list
    function retrieveIngredients(){
        let url = "ingred_retrieval.php"; // put url string here
    
        //fetch by default is a GET request
        fetch(url, {credentials: "include"}) // include credentials for cloud9
           .then(checkStatus)
           .then(function(responseText) {
                fillInList(responseText);
            })
           .catch(function(error) {
              console.log("still sucks");
           });
    }
    
    // sends information to the SQL server to add to the list
    function sendInfo(item, cat, person){
        let url = "ingred_post.php"; // put url string here
    
        let data =  new FormData();
        data.append("ingred", item);
        data.append("category", cat);
        data.append("requester", person);
            
        fetch(url, {method: "POST", body: data, credentials: "include"}) // include credentials for cloud9
           .then(checkStatus)
           .then(function(responseText) {
            console.log("it worked");
            })
           .catch(function(error) {
                console.log("nope");
           });
    }
    
    function removeIngred(item){
        let url = "ingred_remove.php"; // put url string here
    
        let data =  new FormData();
        data.append("ingred", item);
            
        fetch(url, {method: "POST", body: data, credentials: "include"}) // include credentials for cloud9
           .then(checkStatus)
           .then(function(responseText) {
            console.log("Item removed");
            })
           .catch(function(error) {
                console.log("nope");
           });
    }

    function fillInList(info) {
        var fullList = JSON.parse(info);
        for (var i = 0; i < fullList.length; i++) {
            addItem(fullList[i]);    
        }
    }
    
    function addItem(ingred) {
        var newItem = document.createElement("p");
        newItem.innerText = ingred["ingred"] + ", " + ingred["requester"];
        newItem.id = ingred["ingred"];
        newItem.onclick = function () {
            this.parentElement.removeChild(this);
            removeIngred(this.id);
        }
        $(ingred["category"]).appendChild(newItem);
    }
  
  
    function checkStatus(response) {
     const OK = 200; 
     const ERROR = 300;
     if (response.status >= OK && response.status < ERROR) {
       return response.text();
     } else {
       return Promise.reject(new Error(response.status +
                                        ": " + response.statusText));
     }
   }
   
    function addIngredient() {
        var toAdd = $("ingred").value;
        var type = $("selector").options[$("selector").selectedIndex].value;
        console.log(type);
        var person = $("person").value;
        sendInfo(toAdd, type, person);
    }

    function $(id) {
        return document.getElementById(id);
    }

})();