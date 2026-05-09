import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';
import { ChevronLeft, Plus, Clock, CheckCircle2, AlertCircle, Trash2 } from 'lucide-react';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [newTask, setNewTask] = useState({ 
    title: '', 
    description: '', 
    project: id,
    assignedTo: '',
    priority: 'Medium',
    status: 'To Do'
  });

  useEffect(() => {
    fetchProject();
    fetchTasks();
  }, [id]);

  const fetchProject = async () => {
    const res = await api.get(`/projects/${id}`);
    setProject(res.data);
  };

  const fetchTasks = async () => {
    const res = await api.get(`/tasks/project/${id}`);
    setTasks(res.data);
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await api.post('/tasks', newTask);
      setShowTaskModal(false);
      setNewTask({ title: '', description: '', project: id, assignedTo: '', priority: 'Medium', status: 'To Do' });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await api.patch(`/tasks/${taskId}`, { status: newStatus });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  if (!project) return <div>Loading...</div>;

  const columns = ['To Do', 'In Progress', 'Completed'];

  return (
    <div className="project-view animate-fade-in">
      <header className="project-header">
        <Link to="/" className="back-link"><ChevronLeft size={20} /> Back to Projects</Link>
        <div className="title-section">
          <h1>{project.name}</h1>
          <p>{project.description}</p>
        </div>
        <button className="btn-primary flex-center gap-2" onClick={() => setShowTaskModal(true)}>
          <Plus size={18} /> New Task
        </button>
      </header>

      <div className="kanban-board">
        {columns.map(status => (
          <div key={status} className="kanban-column">
            <div className="column-header">
              <h3>{status}</h3>
              <span className="count">{tasks.filter(t => t.status === status).length}</span>
            </div>
            <div className="task-list">
              {tasks.filter(t => t.status === status).map(task => (
                <div key={task._id} className="task-card glass">
                  <div className="task-priority">
                    <span className={`badge ${task.priority.toLowerCase()}`}>{task.priority}</span>
                    <button className="btn-icon delete" onClick={() => deleteTask(task._id)}><Trash2 size={14} /></button>
                  </div>
                  <h4>{task.title}</h4>
                  <p>{task.description}</p>
                  <div className="task-footer">
                    <div className="status-actions">
                      {status !== 'To Do' && <button onClick={() => updateTaskStatus(task._id, status === 'Completed' ? 'In Progress' : 'To Do')} className="btn-mini">Move Back</button>}
                      {status !== 'Completed' && <button onClick={() => updateTaskStatus(task._id, status === 'To Do' ? 'In Progress' : 'Completed')} className="btn-mini primary">Next Step</button>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showTaskModal && (
        <div className="modal-overlay">
          <div className="modal-content glass animate-fade-in">
            <h2>Add New Task</h2>
            <form onSubmit={handleCreateTask}>
              <div className="form-group">
                <label>Task Title</label>
                <input 
                  type="text" 
                  value={newTask.title} 
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  value={newTask.description} 
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  rows="3"
                />
              </div>
              <div className="form-row">
                <div className="form-group flex-1">
                  <label>Priority</label>
                  <select value={newTask.priority} onChange={(e) => setNewTask({...newTask, priority: e.target.value})}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div className="form-group flex-1">
                  <label>Initial Status</label>
                  <select value={newTask.status} onChange={(e) => setNewTask({...newTask, status: e.target.value})}>
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                  </select>
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-ghost" onClick={() => setShowTaskModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Add Task</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
