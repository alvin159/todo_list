import axios from 'axios';
import '../App.css';
import React from 'react';
import Moment from 'moment';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

/*
npm install axios
npm install json-server --save-dev 
npm install react-beautiful-dnd --save
npm install react-color --save
npm i moment
npx json-server -H localhost -p 3010 -w ./db.json
https://www.youtube.com/watch?v=dD0MdMRVHoo
*/

class Todo extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      todo: [],      
      color: "",      
      input: '',
      tags:'',
      searchTitle: '',
      searchTags: '',
      option: 'all',
    };
  }

  //this function puts the data from the backend server into into todo
  componentDidMount() { 
    axios.get('http://127.0.0.1:3010/todos')
    .then((response) => {
      this.setState({todo : response.data}) 
      console.log(this.state.todo)
    })

    axios.get('http://127.0.0.1:3010/color')
    .then((response) => {
      this.setState({color : response.data})
      console.log(this.state.color)
    })
  }

  //this function is triggered when the Add button is pushed and the "Write a list here" and "Insert Tags here" shouldn't be empty when the button is pushed. Otherwise, the list won't be pushed to the backend server.
  add(){
    if(this.state.input === ""){
      alert("The input shouldn't be void")
    }
    else if(this.state.tags === ""){
      alert("The tags shouldn't be void")
    }
    else if(this.state.input && this.state.tags !== ""){
      axios.post('http://127.0.0.1:3010/todos', { 
        title: this.state.input,
        status: "undone",
        date: new Date().toLocaleString(),
        tags: this.state.tags,
        color: "red"
      });
      alert("New List")
      window.location.reload(false);}
  }

  //this function handles the editing part of the list. It sets the title and tags of the list into the "Write a list here" and "Insert Tags here". So, the user can change the title and the tags of the list.
  edit(id,title,tags){
    this.setState({input : title})
    this.setState({tags : tags})
    while(this.state.input !== ""){
      axios.patch('http://127.0.0.1:3010/todos/'+id, { 
        title: this.state.input,
        tags: this.state.tags,
        date: new Date().toLocaleString()
      });    
      this.setState({input : ""})
      alert("Updated List")
      window.location.reload(false);
      return;}
  }
  
  //this function changed the status of the list from "undone" to "complete" when the complete button is pressed
  completeButton(id,status){
    if(status !== "completed"){
      axios.patch('http://127.0.0.1:3010/todos/'+id, { 
        status: "completed",
        color: "green"
      });
      alert("Completed task")
      window.location.reload(false);}
    else{alert("This task has been completed")}
  }

  //this function handles the removal of a list from the backend server
  delete(id){
    console.log(id)
    axios.delete('http://127.0.0.1:3010/todos/'+id)
    alert("List is deleted")
    window.location.reload(false);
  }

  //this function shows the todo list from the todo array and handles the droppable and draggable list
  list(stat){
    return(
      <Droppable droppableId="characters">
          {(provided) => (
            <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
              {this.state.todo    
              //this filter handles the search title input         
              .filter((list) => {
                let search = false
                if (list.title.toLocaleLowerCase().includes(this.state.searchTitle)) search = true;
                else if(this.state.searchTitle === "") search = true;
                return search
              })
              //this filter handles the search tags input      
              .filter((list) => {
                let search = false
                if (list.tags.toLocaleLowerCase().includes(this.state.searchTags)) search = true;
                else if(this.state.searchTags === "") search = true;
                return search
              })                
              //this filter handles the status of the list     
              .filter((list) => {
                let search = false
                if (list.status === stat) search = true
                else if(list.status === stat) search = true
                else if("all" === stat) search = true
                //this handles the sort date of the list
                else if("sortDate" === stat) {                  
                  this.state.todo.sort((a,b) => new Moment(a.date).format('DD/MM/YYYY, HH:mm:ss') < new Moment(b.date).format('DD/MM/YYYY, HH:mm:ss') ? 1 : -1)
                  search = true}              
                return search
              })       
              //this maps the id, title, status, tags, color from the todo array and return the list for the user to see
              .map(({id, title, status, tags, color}, index) => {
                return (
                  <Draggable key={id} draggableId={id+title} index={index}>
                    {(provided) => (
                      <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <input style={{ backgroundColor: color}} value={title} onChange={e => this.setState({input : e.target.value})}/>
                        <button onClick={() => this.completeButton(id,status) }>complete</button>
                        <button onClick={() => this.edit(id,title,tags)}>edit</button>
                        <button onClick={() => this.delete(id)}>delete</button>    
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
      </Droppable>
    )
  }

  render() {
    //this is the style for the main page of the Todo app
    const styles = {
      todo:{
        textAlign: "center",
        height: "23.90cm",  
        backgroundColor: this.state.color.backgroundColor
      }
    }

    //putting the list function into a const so it can be called under DragDropContext and to make the return section looks more simple
    const mylist = this.list(this.state.option);
    
    //this works for the DragDrop
    const onDragEnd = (result) => 
    {const items = Array.from(this.state.todo);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      this.setState({todo : items})
    }
    
    return (
      <div className="todo"  style={styles.todo} >  
        <div>
          <h1>Todos List</h1>
        </div>
          
        <div>
          <input 
            placeholder="Write a list here"
            onChange={e => this.setState({input : e.target.value})}
            value={this.state.input}
          />

          <input 
            placeholder="Insert Tags here"
            onChange={e => this.setState({tags : e.target.value})}
            value={this.state.tags}
          />    
          
          <button onClick={()=>this.add()}>Add</button>
        </div>

        <div>
          <label>Tags: </label>
          <button onClick={()=> this.setState({tags: "important"})}>Important</button>
          <button onClick={()=> this.setState({tags: "relax"})}>Relax</button>
        </div>

        <div>
          <input 
            placeholder="Search title"
            onChange={e => this.setState({searchTitle : e.target.value})}
            value={this.state.searchTitle}
          />     

          <input 
            placeholder="Search tags"
            onChange={e => this.setState({searchTags : e.target.value})}
            value={this.state.searchTags}
          />        
        </div>
        
        <div>
          <button onClick={()=> this.setState({option : "sortDate"})}>Sort Date</button>
          <select onChange={e => this.setState({option : e.target.value})}>    
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="undone">Undone</option>
          </select>
        </div>

        <div className="list">
          <DragDropContext
          onDragEnd={onDragEnd}>
            {mylist}
          </DragDropContext>
        </div>

      </div>
    );
  }
}

export default Todo;
