// tasks.tsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addTask, removeTask, ProjectState, selectProjects } from "../../redux/projectSlice";
import { RootState } from "../../redux/store";

// Define the props interface with type annotation for desiredProject
interface TodoListProps {
  desiredProject: string;
}

const TodoList: React.FC<TodoListProps> = ({ desiredProject }) => {
  const dispatch = useDispatch();
  const projects = useSelector((state: RootState) => selectProjects(state));
  const [inputText, setInputText] = useState<string>('');
  const [todos, setTodos] = useState<string[]>([]);

  // Filter tasks based on the selected project
  useEffect(() => {
    const selectedProject = projects.find(project => project.title === desiredProject);
    if (selectedProject) {
      setTodos(selectedProject.tasks);
    } else {
      setTodos([]);
    }
  }, [desiredProject, projects]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleAddTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputText.trim() !== '') {
      const newTodo = inputText.trim();
      setTodos(prevTodos => [...prevTodos, newTodo]); 
      // Pass only projectId and task directly
      dispatch(addTask({ projectId: desiredProject, task: newTodo }));  
      setInputText('');
    }
  };
  
  const handleRemoveTodo = (todo: string) => {
    setTodos(prevTodos => prevTodos.filter(task => task !== todo));
    dispatch(removeTask({ projectId: desiredProject, task: todo }));
  };

  return (
    <div className="todo-list">
      <div className="input-container">
        <input
          type="text"
          className="inputText"
          style={{ width: '100%' }}
          value={inputText}
          onChange={handleInputChange}
          onKeyPress={handleAddTodo}
        />
      </div>
      <ul className="todos">
        {todos.map(todo => (
          <li key={todo}>
            <input type="checkbox" onClick={() => handleRemoveTodo(todo)} />
            <span className='task-text'>{todo}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
