import React, { useEffect, useState } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Moment from "moment";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [tags, setTags] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [searchTags, setSearchTags] = useState("");
  const [option, setOption] = useState("all");

  const API = process.env.REACT_APP_API_URL || "http://localhost:3010";

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get(`${API}/todos`);
    setTodos(res.data);
  };

  // Add new todo
  const addTodo = async () => {
    if (!input || !tags) return alert("Input and tags required");
    const newTodo = { title: input, tags, status: "undone", date: new Date() };
    const res = await axios.post(`${API}/todos`, newTodo);
    setTodos(prev => [...prev, res.data]);
    setInput(""); 
    setTags("");
  };

  // Toggle complete/undo
  const toggleComplete = async (todo) => {
    const newStatus = todo.status === "completed" ? "undone" : "completed";
    const res = await axios.patch(`${API}/todos/${todo._id}`, { status: newStatus });
    setTodos(prev => prev.map(t => t._id === todo._id ? res.data : t));
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API}/todos/${id}`);
    setTodos(prev => prev.filter(t => t._id !== id));
  };

  const startEdit = (id) => {
    setTodos(prev =>
      prev.map(t => (t._id === id ? { ...t, isEditing: true } : t))
    );
  };

  const saveEdit = async (id, title, tags) => {
    try {
      const res = await axios.patch(`${API}/todos/${id}`, { title, tags, date: new Date() });
      setTodos(prev =>
        prev.map(t => (t._id === id ? { ...res.data, isEditing: false } : t))
      );
    } catch (err) {
      console.error(err);
      alert("Failed to edit todo");
    }
  };

  const onChangeInline = (id, field, value) => {
    setTodos(prev =>
      prev.map(t => (t._id === id ? { ...t, [field]: value } : t))
    );
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;
    const items = Array.from(todos);
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);
    setTodos(items);

    try {
      // send new order to backend
      await axios.post(`${API}/todos/reorder`, {
        reordered: items.map(t => t._id)
      });
    } catch (err) {
      console.error("Failed to save order", err);
    }
  };


  const filteredTodos = todos.filter(t => {
    const titleMatch = t.title?.toLowerCase().includes(searchTitle.toLowerCase());
    // Join array of tags into a single lowercase string
    const tagsText = Array.isArray(t.tags) ? t.tags.join(', ') : t.tags || '';
    const tagsMatch = tagsText.toLowerCase().includes(searchTags.toLowerCase());
    const statusMatch = option === "all" || t.status === option;
    return titleMatch && tagsMatch && statusMatch;
  });


  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '1rem' }}>Todo List</h2>

      {/* Top bar to add new todos */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <input placeholder="Title" value={input} onChange={e => setInput(e.target.value)} style={styles.input} />
        <input placeholder="Tags" value={tags} onChange={e => setTags(e.target.value)} style={styles.input} />
        <button onClick={addTodo} style={styles.addButton}>Add</button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <input placeholder="Search title" value={searchTitle} onChange={e => setSearchTitle(e.target.value)} style={styles.input} />
        <input placeholder="Search tags" value={searchTags} onChange={e => setSearchTags(e.target.value)} style={styles.input} />
        <select value={option} onChange={e => setOption(e.target.value)} style={styles.select}>
          <option value="all">All</option>
          <option value="undone">Undone</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Todo list */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="todos">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef} style={{ listStyle: 'none', padding: 0 }}>
              {filteredTodos.map((t, idx) => (
                <Draggable key={t._id} draggableId={t._id} index={idx}>
                  {(prov) => (
                    <li ref={prov.innerRef} {...prov.draggableProps} {...prov.dragHandleProps} style={{ ...styles.card, ...prov.draggableProps.style, opacity: t.status === "completed" ? 0.7 : 1 }}>
                      <div>
                        {t.isEditing ? (
                          <>
                            <input
                              value={t.title}
                              onChange={e => onChangeInline(t._id, "title", e.target.value)}
                              style={styles.editInput}
                            />

                            <div style={styles.tagsEditor}>
                              {(Array.isArray(t.tags) ? t.tags : []).map((tag, i) => (
                                <div key={i} style={styles.tagBox}>
                                  <span>{tag}</span>
                                  <button
                                    onClick={() => {
                                      const newTags = t.tags.filter((_, idx) => idx !== i);
                                      onChangeInline(t._id, "tags", newTags);
                                    }}
                                    style={styles.removeTagBtn}
                                  >
                                    ×
                                  </button>
                                </div>
                              ))}

                              <input
                                placeholder="Add tag..."
                                onKeyDown={e => {
                                  if (e.key === ',' || e.key === 'Enter') {
                                    e.preventDefault();
                                    const value = e.target.value.trim();
                                    if (value) {
                                      const newTags = [...(t.tags || []), value];
                                      onChangeInline(t._id, "tags", newTags);
                                      e.target.value = '';
                                    }
                                  } else if (e.key === 'Backspace' && e.target.value === '') {
                                    // remove last tag
                                    const newTags = (t.tags || []).slice(0, -1);
                                    onChangeInline(t._id, "tags", newTags);
                                  }
                                }}
                                onBlur={e => {
                                  const value = e.target.value.trim();
                                  if (value) {
                                    const newTags = [...(t.tags || []), value];
                                    onChangeInline(t._id, "tags", newTags);
                                  }
                                  e.target.value = '';
                                }}
                                style={styles.tagInput}
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            <strong
                              style={{
                                textDecoration: t.status === "completed" ? "line-through" : "none",
                              }}
                            >
                              {t.title}
                            </strong>
                            <div style={styles.tagsContainer}>
                              {(Array.isArray(t.tags) ? t.tags : []).map((tag, i) => (
                                <span key={i} style={styles.tagBoxStatic}>{tag}</span>
                              ))}
                            </div>
                            <div style={styles.date}>
                              {Moment(t.date).format("DD/MM/YYYY HH:mm")}
                            </div>
                          </>
                        )}

                      </div>

                      <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
                        <button onClick={() => toggleComplete(t)} style={{...styles.completeButton, backgroundColor: t.status === "completed" ? "#6c757d" : "#28a745"}}>
                          {t.status === "completed" ? "Undo" : "Complete"}
                        </button>

                        {t.isEditing ? (
                          <button onClick={() => saveEdit(t._id, t.title, t.tags)} style={styles.saveButton}>Save</button>
                        ) : (
                          <button onClick={() => startEdit(t._id)} style={styles.editButton}>Edit</button>
                        )}

                        <button onClick={() => deleteTodo(t._id)} style={styles.deleteButton}>Delete</button>
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

const styles = {
  input: { padding: '8px', borderRadius: '6px', border: '1px solid #ccc', flex: '1' },
  select: { padding: '8px', borderRadius: '6px', border: '1px solid #ccc' },
  addButton: { backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '6px', padding: '5px 12px', cursor: 'pointer' },
  card: { backgroundColor: '#fff', padding: '15px', borderRadius: '8px', marginBottom: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' },
  tags: { fontSize: '0.85rem', color: '#666' },
  date: { fontSize: '0.75rem', color: '#999', marginTop: '5px' },
  completeButton: { color: '#fff', border: 'none', borderRadius: '6px', padding: '5px 10px', cursor: 'pointer' },
  editButton: { backgroundColor: '#ffc107', color: '#fff', border: 'none', borderRadius: '6px', padding: '5px 10px', cursor: 'pointer' },
  saveButton: { backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '6px', padding: '5px 10px', cursor: 'pointer' },
  deleteButton: { backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '6px', padding: '5px 10px', cursor: 'pointer' },
  editInput: { padding: '5px', marginRight: '5px', borderRadius: '4px', border: '1px solid #ccc', minWidth: '100px' },
    tagsEditor: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
    marginTop: "5px",
    alignItems: "center",
  },
  tagBox: {
    background: "#e0e0e0",
    padding: "4px 8px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  removeTagBtn: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    color: "#555",
  },
  tagInput: {
    border: "none",
    outline: "none",
    minWidth: "80px",
    padding: "4px",
  },
  tagsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
    marginTop: "5px",
  },
  tagBoxStatic: {
    background: "#d0ebff",
    padding: "4px 8px",
    borderRadius: "12px",
    fontSize: "0.85rem",
  },

};

export default Todo;
