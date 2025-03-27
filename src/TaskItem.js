import React, { useState } from 'react'; // Importation de React et du hook useState
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importation des icônes pour modifier et supprimer

// Composant TaskItem : représente une tâche individuelle
const TaskItem = ({ task, onDelete, onToggle, onEdit }) => {
  // État local pour gérer l'affichage des détails de la tâche
  const [showDetails, setShowDetails] = useState(false);

  // Fonction pour basculer l'affichage des détails
  const handleDetailsClick = () => { // Définit la fonction handleDetailsClick pour gérer le clic sur les détails de la tâche
    setShowDetails(!showDetails); // Inverse la valeur de showDetails
  };

  return (
    <li 
      // Style dynamique pour le conteneur de la tâche
      style={{ 
        backgroundColor: task.completed ? '#e0e0e0' : '#fff', // Couleur de fond selon l'état "complété"
        borderLeft: task.completed ? '5px solid #4CAF50' : 'none', // Bordure verte si complété
        display: 'flex', // Utilise un affichage flex
        flexDirection: 'column', // Empile les éléments verticalement
        alignItems: 'flex-start', // Alignement vers la gauche
        padding: '10px', // Marge intérieure de 10px
        marginBottom: '5px', // Marge inférieure de 5px
        borderRadius: '5px' // Coins arrondis
      }}
    >
      {/* Conteneur principal pour les informations de la tâche */}
      <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        {/* Case à cocher pour marquer la tâche comme complétée */}
        <input 
          type="checkbox" 
          checked={task.completed} // État de la case à cocher
          onChange={() => onToggle(task.id)} // Appelle la fonction onToggle avec l'ID de la tâche
          style={{
            accentColor: '#4CAF50', // Couleur verte pour la case cochée
            marginRight: '10px'
          }}
        />
        {/* Nom de la tâche, cliquable pour afficher les détails */}
        <span 
          style={{ flex: 1, cursor: 'pointer' }} // Permet au texte de prendre tout l'espace restant
          onClick={handleDetailsClick} // Affiche ou masque les détails au clic
        >
          {task.name} {/* Affiche le nom de la tâche */}
        </span>
        {/* Bouton pour modifier la tâche */}
        <button 
          onClick={() => onEdit(task.id)} // Appelle la fonction onEdit avec l'ID de la tâche
          style={{ marginRight: '5px' }} // Marge à droite de 5px
        >
            <FaEdit /> {/* Icône de crayon pour modifier la tâche */}
        </button>
        {/* Bouton pour supprimer la tâche */}
        <button 
          onClick={() => onDelete(task.id)} // Appelle la fonction onDelete avec l'ID de la tâche
        >
            <FaTrash /> {/* Icône de corbeille pour supprimer la tâche */}
        </button>
      </div>
      {/* Affichage conditionnel des détails de la tâche */}
      {showDetails && ( // Affiche les détails si showDetails est vrai
        // Style pour les détails
        <div 
          style={{ marginTop: '10px', color: '#555', fontSize: '14px' }} // Style pour les détails
        >
          <strong>Description :</strong> {task.description || 'Aucune description disponible.'}
          {/* Affiche la description ou un message par défaut si elle est absente */}
        </div>
      )}
    </li>
  );
};

export default TaskItem; // Exportation du composant TaskItem