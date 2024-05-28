import React from 'react';

interface PageProps {
  children?: React.ReactNode;
  className?: string;
  sectionC: boolean; // Receive sectionC as a prop
  updateSectionC: (type: 'projects' | 'tasks') => void; // Receive updateSectionC as a prop
}

const Page: React.FC<PageProps> = ({ children, className, sectionC, updateSectionC }) => {

  return (
    <div className="custom-container">
      <div className="row">
        <div className="col"></div>
        <div className="col">
          <div className="slider">
            <span className={`projects ${className}`} onClick={() => updateSectionC('projects')}>Projects</span>
            <span className={`tasks ${sectionC ? '' : 'current'}`}>Tasks</span>
          </div>
        </div>
        <div className="col"></div>
      </div>
      {children} 
    </div>
  );
};

export default Page;
