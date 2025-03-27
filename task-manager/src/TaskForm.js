import React, { useState, useEffect } from 'react'; // Importation de React et des hooks useState et useEffect

// Composant TaskForm : formulaire pour ajouter ou éditer une tâche
const TaskForm = ({ onSubmit, taskToEdit }) => {
  // États locaux pour gérer le nom et la description de la tâche
  const [name, setName] = useState(''); // État pour le nom de la tâche
  const [description, setDescription] = useState(''); // État pour la description de la tâche
  
  // Effet pour pré-remplir le formulaire si une tâche est en cours d'édition
  useEffect(() => {
    if (taskToEdit) {
      setName(taskToEdit.name); // Remplit le champ "Nom" avec les données de la tâche à éditer
      setDescription(taskToEdit.description); // Remplit le champ "Description" avec les données de la tâche à éditer
    }
  }, [taskToEdit]); // Déclenche l'effet uniquement lorsque taskToEdit change

  // Gestionnaire de soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    // Vérifie que les champs "Nom" et "Description" ne sont pas vides
    if (!name || !description) {
      alert("Le nom et la description de la tâche sont obligatoires"); // Affiche une alerte si un champ est vide
      return;
    }
    // Appelle la fonction onSubmit avec les données de la tâche
    onSubmit({ name, description });
    // Réinitialise les champs du formulaire après la soumission
    setName('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Champ pour le nom de la tâche */}
      <input 
        type="text" 
        value={name} // Valeur liée à l'état "name"
        onChange={(e) => setName(e.target.value)} // Met à jour l'état "name" à chaque modification
        placeholder="Nom de la tâche" // Texte indicatif dans le champ
      />
      {/* Champ pour la description de la tâche */}
      <input 
        type="text" 
        value={description} // Valeur liée à l'état "description"
        onChange={(e) => setDescription(e.target.value)} // Met à jour l'état "description" à chaque modification
        placeholder="Description de la tâche" // Texte indicatif dans le champ
      />
      {/* Bouton pour soumettre le formulaire */}
      <button type="submit"> {/* Type de bouton "submit" */}
        {taskToEdit ? 'Mettre à jour la tâche' : 'Ajouter une tâche'} 
        {/* Change le texte du bouton selon qu'il s'agit d'une édition ou d'un ajout */}
      </button>
    </form>
  );
};

export default TaskForm; // Exportation du composant TaskForm