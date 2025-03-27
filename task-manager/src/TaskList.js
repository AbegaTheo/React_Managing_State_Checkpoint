import React from 'react'; // Importation de React
import TaskItem from './TaskItem'; // Importation du composant TaskItem

// Composant TaskList : affiche une liste de tâches
const TaskList = ({ tasks, onDelete, onToggle, onEdit }) => {
  return (
    <ul>
      {/* Parcourt la liste des tâches et rend un composant TaskItem pour chaque tâche */}
      {tasks.map((task) => (
        <TaskItem 
          key={task.id} // Clé unique pour chaque tâche (nécessaire pour React)
          task={task} // Données de la tâche actuelle
          onDelete={onDelete} // Fonction pour supprimer une tâche
          onToggle={onToggle} // Fonction pour basculer l'état "complété" d'une tâche
          onEdit={onEdit} // Fonction pour éditer une tâche
        />
      ))}
    </ul>
  );
};

export default TaskList; // Exportation du composant TaskList