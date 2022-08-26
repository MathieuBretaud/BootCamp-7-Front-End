const newTaskForm = {


  // initialisation du composant
  init: function(){
    newTaskForm.bindNewTaskFormEventListener();
  },

  // ajout un  eventlistener liés au formulaire d'ajout d'une tâche
  bindNewTaskFormEventListener: function(){
    // on récupère le formulaire d'ajout d'un" tache (le form qui est dans un element de classe task--add)
    const newTaskFormElement = document.querySelector('.task--add form');

    newTaskFormElement.addEventListener('submit', newTaskForm.handleNewTaskFormSubmit);
  },

  handleNewTaskFormSubmit: function(evt){
    // on empeche la page de se recharger :
    evt.preventDefault();
    // recupération du form
    const newTaskFormElement = evt.currentTarget;
    // récupération de l'input du titre de la tache
    const taskTitleFieldElement = newTaskFormElement.querySelector('.task__title-field');
    // récupération de la valeur de l'input
    const newTaskTitle = taskTitleFieldElement.value;
    //
    // récupération de l'élément select
    const categoryElement = newTaskFormElement.querySelector('.task__category select');
    //! E07
    //Pour récupérer le nom de la catégorie, je ne peux plus faire
    // categoryElement.value car on a donnée une value a chaque option: l'id de la catégorie qu'elle représente 
    const newTaskCategoryName = categoryElement.querySelector('option:checked').textContent;
    // je récupère l'id de la catégories
    const newTaskCategoryId = categoryElement.value;

    //TODO On va faire un fetch vers /tasks en POST pour AJOUTER
    // la nouvelle tâche en BDD
    
    // on prépare les données de la nouvelle tâche
    const newTaskData = {
      title: newTaskTitle,
      categoryId: newTaskCategoryId
    };

    // on spécifie que les données sont en JSON
    let httpHeaders = new Headers();
    httpHeaders.append('Content-Type', 'application/json');

    // on prépare la configuration de la requête HTTP
    const fetchOptions = {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: httpHeaders,// On ajoute les données, encodée en JSON, dans le corps de la requête
      body: JSON.stringify(newTaskData)
    };
    // le fetch permet d'envoyer la requête
    fetch(app.apiRootUrl + '/tasks', fetchOptions)
      //dès qu'on reçoit une réponse :
      .then(
        function(response){
          if(response.status !== 201){
            //todo
          }
          return response.json();
        }
      )
      .then(
        function(newTaskObject){
          // je fabrique un nouvel élement tache
          // grace a notre methode createTaskElement
          const newTaskElement = task.createTaskElement(newTaskTitle, newTaskCategoryName, newTaskObject.id, newTaskObject.completion);
          // j'ajoute ce dernier a la liste des taches
          tasksList.insertTaskIntoTasksList(newTaskElement);
        }
      )



    
    // j'imagine une methode qui va nous permettre de créer une nouvelle tache
    // cette methode va recevoir 2 arguments : le nom de la tache et le nom de la categorie

    // j'imagine une methode dont le but sera de nous afficher la tache ( l'inserer dans la lsite des taches);
    tasksList.insertTaskIntoTasksList(newTaskElement);

  },

}