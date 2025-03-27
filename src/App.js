import './App.css'; // Importation des styles CSS
import React, { useState, useEffect } from 'react'; // Importation de React et des hooks useState et useEffect
import TaskList from './TaskList'; // Importation du composant TaskList
import TaskForm from './TaskForm'; // Importation du composant TaskForm

// Composant principal de l'application
const App = () => {
  // État pour stocker la liste des tâches
  const [tasks, setTasks] = useState([]);
  // État pour stocker la tâche en cours d'édition
  const [taskToEdit, setTaskToEdit] = useState(null);
  // Etat pour stocker le filtre de tâches
  const [filter, setFilter] = useState('all');

  // Charger les tâches depuis localStorage au démarrage de l'application
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')); // Récupère les tâches stockées
    if (storedTasks) { // Vérifie si des tâches ont été trouvées
      setTasks(storedTasks); // Met à jour l'état avec les tâches récupérées
    }
  }, []); // Exécuté une seule fois au montage du composant

  // Sauvegarder les tâches dans localStorage à chaque modification de l'état `tasks`
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Stocke les tâches dans localStorage
  }, [tasks]); // Déclenché lorsque `tasks` change

  // Fonction pour ajouter une nouvelle tâche
  const addTask = (task) => { // Définit la fonction addTask pour ajouter une nouvelle tâche
    setTasks([...tasks, { ...task, id: Date.now(), completed: false }]); // Ajoute une tâche avec un ID unique et un état "non complété"
  };

  // Fonction pour basculer l'état "complété" d'une tâche
  const toggleTaskCompletion = (id) => { // Définit la fonction toggleTaskCompletion pour basculer l'état "complété" d'une tâche
    setTasks(tasks.map(task => /* Parcourt la liste des tâches et inverse l'état "complété" de la tâche correspondante */
      task.id === id ? { ...task, completed: !task.completed } : task // Inverse l'état "complété" de la tâche correspondante
    ));
  };

  // Fonction pour supprimer une tâche
  const deleteTask = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) { // Demande de confirmation avant suppression
      setTasks(tasks.filter(task => task.id !== id)); // Supprime la tâche correspondante
    }
  };

  // Fonction pour passer une tâche en mode édition
  const editTask = (id) => {
    const task = tasks.find(task => task.id === id); // Trouve la tâche correspondante
    setTaskToEdit(task); // Met à jour l'état avec la tâche à éditer
  };

  // Fonction pour mettre à jour une tâche existante
  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => /* Parcourt la liste des tâches et met à jour la tâche correspondante */
      task.id === taskToEdit.id ? { ...task, ...updatedTask } : task // Met à jour la tâche correspondante avec les nouvelles données
    ));
    setTaskToEdit(null); // Réinitialise l'état `taskToEdit` après la mise à jour
  };

  // Fonction pour filtrer les tâches
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') { // Si le filtre est 'completed'
      return task.completed; // N'affiche que les tâches complétées
    } else if (filter === 'active') { // Si le filtre est 'active'
      return!task.completed; // N'affiche que les tâches non complétées
    } else { // Si le filtre est 'all'
      return true; // Affiche toutes les tâches
    }
  });

  return (
    <div>
      <h1>Gestionnaire des tâches</h1>
      {/* Formulaire pour ajouter ou éditer une tâche */}
      <TaskForm onSubmit={taskToEdit ? updateTask : addTask} taskToEdit={taskToEdit} />
  
      {/* Filtre de tâches */}
      <div className='filter-buttons'>
        <button
          className={filter === 'all' ? 'active' : ''} // Ajoute la classe 'active' si le filtre est 'all'
          onClick={() => setFilter('all')}>Tous
        </button>
        <button
          className={filter === 'active' ? 'active' : ''} // Ajoute la classe 'active' si le filtre est 'active'
          onClick={() => setFilter('active')}>Actives
        </button>
        <button
          className={filter === 'completed' ? 'active' : ''} // Ajoute la classe 'active' si le filtre est 'completed'
          onClick={() => setFilter('completed')}>Completées
        </button>
      </div>
  
      {/* Liste des tâches */}
      <TaskList 
        tasks={filteredTasks} // Liste des tâches filtrées
        onDelete={deleteTask} // Fonction pour supprimer une tâche
        onToggle={toggleTaskCompletion} // Fonction pour basculer l'état "complété" d'une tâche
        onEdit={editTask} // Fonction pour éditer une tâche
      />
    </div>
  );
};

export default App; // Exportation du composant principal