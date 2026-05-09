import React, { useState, useEffect } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Plus, Briefcase, Calendar, CheckCircle } from 'lucide-react';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', description: '' });
  const { user } = useAuth();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await api.get('/projects');
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      await api.post('/projects', newProject);
      setShowModal(false);
      setNewProject({ name: '', description: '' });
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="dashboard animate-fade-in">
      <header className="dash-header">
        <div>
          <h1>Projects Overview</h1>
          <p>Manage and track your team's progress</p>
        </div>
        {user?.role === 'Admin' && (
          <button className="btn-primary flex-center gap-2" onClick={() => setShowModal(true)}>
            <Plus size={18} />
            New Project
          </button>
        )}
      </header>

      <div className="stats-grid">
        <div className="stat-card glass">
          <Briefcase className="stat-icon blue" />
          <div className="stat-info">
            <h3>{projects.length}</h3>
            <p>Total Projects</p>
          </div>
        </div>
        {/* Additional stats could go here */}
      </div>

      <div className="projects-grid">
        {projects.map(project => (
          <Link to={`/projects/${project._id}`} key={project._id} className="project-card glass">
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <div className="project-meta">
              <span>By {project.owner.name}</span>
              <span>{new Date(project.createdAt).toLocaleDateString()}</span>
            </div>
          </Link>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content glass animate-fade-in">
            <h2>Create New Project</h2>
            <form onSubmit={handleCreateProject}>
              <div className="form-group">
                <label>Project Name</label>
                <input 
                  type="text" 
                  value={newProject.name} 
                  onChange={(e) => setNewProject({...newProject, name: e.target.value})} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  value={newProject.description} 
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  rows="3"
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Create Project</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
