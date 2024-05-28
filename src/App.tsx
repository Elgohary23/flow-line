import './App.css';
import TodoList from './components/data/Tasks';
import Projects from './components/data/projects';
import NavBar from './components/navBar';
import Page from './components/page';
import About from './components/About';
import Contact from './components/Contact';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

function App() {
  const [sectionC, setSectionC] = useState(true);
  const [selectedProject, setSelectedProject] = useState<string>("");

  const updateSectionC = (type: 'projects' | 'tasks') => {
    setSectionC(type === 'projects');
  };

  const handleProjectClick = (projectTitle: string) => {
    setSelectedProject(projectTitle);
    setSectionC(false);
  };

  let view;
  if (sectionC) {
    view = <Projects onProjectClick={handleProjectClick} />;
  } else {
    view = <TodoList desiredProject={selectedProject} />;
  }

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Page className={sectionC ? "current" : ""} sectionC={sectionC} updateSectionC={updateSectionC}>{view}</Page>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
