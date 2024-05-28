// Projects.tsx
import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addProject, selectProjects } from "../../redux/projectSlice";

interface Project {
  title: string;
  tasks: string[];
}

interface Props {
  onProjectClick: (projectTitle: string) => void;
}

function Projects({ onProjectClick }: Props) {
  const [inputValue, setInputValue] = useState<string>("");
  const projectsArray = useSelector(selectProjects);
  const dispatch = useDispatch();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      const newProject: Project = {
        title: inputValue,
        tasks: [],
      };
      dispatch(addProject(newProject));
      setInputValue("");
    }
  };

  const handleClick = (projectTitle: string) => {
    onProjectClick(projectTitle);
  };

  return (
    <>
      <input
        className="new-element-titling"
        type="text"
        placeholder="start a new dream..."
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <ul className="projects-UL">
        {projectsArray.map((project) => (
          <li className="project-Li" key={project.title} onClick={() => handleClick(project.title)}>
            {project.title}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Projects;
