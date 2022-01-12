import React from "react";

function Info() {
  return (
    <div className="info">
      <h1>Info</h1>
      <h4>Author: Alvin Wijaya</h4><br/> 
      <p>        
      <h5>Instructions for the Todo app</h5>      
      There is a navigation bar on the top right.  <br/> 
      Write a list and insert tags on their respective input bar and click add  <br/> 
      There are also 2 predifined tags (categories) and when clicked it puts the tags into the tag input bar <br/> 
      The search title input can search the list based on it's title  <br/> 
      The search tags input can search the list based on it's tags  <br/> 
      When editing, click the edit button of the desired list. <br/> 
      Then the title and the tag will appear on the write a list and insert tags respectively. <br/> 
      After that, the user can modify the title and the tags from there. <br/> 
      When the user is done, they can click again the edit button of the same list and modification is done. <br/> 
      The Sort Date button can sort the list based on their latest modification times <br/> 
      The user can reoder the appearance of the list by moving the dot (.) on the left part of the list<br/> 
      The user can see the all, completed and undone list from the dropdown option on the right side of the Sort Date button<br/> 
      The user can delete a list by clicking on the delete button on the right side of the list<br/> 
      When the user click on the complete button the list will turn green and the status will be change from undone to complete<br/> 

      <h5>Settings</h5>
      The background color of the main Todo page can be change from the setting page<br/> 

      <h5>Prerequisite </h5>
      npm install axios <br/> 
      npm install json-server --save-dev <br/> 
      npm install react-beautiful-dnd --save <br/>
      npm install react-color --save <br/>
      npm i moment <br/>
      to run the backend server : npx json-server -H localhost -p 3010 -w ./db.json <br/>
      </p>
    </div>
  );
}

export default Info;