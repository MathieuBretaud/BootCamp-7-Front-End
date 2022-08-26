const tasksList = {
  // initialisation du composant
  init: function(){
    // ici on voudrait pouvoir ajouter des ecouteurs d'évenements sur toutes les taches
    //tasksList.bindAllTasksEvents();
    tasksList.loadTasksFromAPI();
  },
  // Chargement des taches depuis notyre API
  loadTasksFromAPI: function(){

     // on prépare la configuration de la requête HTTP
     const config = {
      method: 'GET',
      mode: 'cors', // sécu, a voir en e07
      cache: 'no-cache' // no-cache en dev, mais pas en prod ! 
    };

    fetch(app.apiRootUrl + '/tasks', config)
      .then(
        function(response){
          return response.json();
        }
      )
      .then(
        function(tasksDataFromAPI){
          console.log(tasksDataFromAPI);

          // boulce qui va parcourir le resultat de notre requete qui a été convertis !
          // a chaque tour de boucle je récupère un tableau associatif qui représente une tache
          for(const singleTask of tasksDataFromAPI){
            // a chaque tour de boucle j'utilise deux methode que j'ai déja créé, une qui permet de fabriquer un nouvel élement tache, et une autre qui permet d'injecter une tache dans la liste des taches 
            const newTaskElement = task.createTaskElement(singleTask.title, singleTask.category.name, singleTask.id, singleTask.completion,singleTask.status);
            tasksList.insertTaskIntoTasksList(newTaskElement);

          }

        }
      );


  },
  // poser les écouteurs d'évents sur toute les taches
  // obsolete depuis E04
  bindAllTasksEvents: function(){
     // On récupère dans un tableau tous les éléments du DOM correspondant aux tâches
     // les éléments de classe task qui sont dans les éléments de classe tasks
     const taskElementsList = document.querySelectorAll('.tasks .task');
     
     
     for(const taskElement of taskElementsList){
       // ici j'imagine un composant "task" qui contiendrait une methode 
       // qui va nous servir a ajouter tous les écouteurs d'évents sur UNE TACHE
       task.bindSingleTaskEventListener(taskElement);
     }
     

  },
  // ajouter une tache a la liste des tache
  insertTaskIntoTasksList: function(taskElement){
    // je cible la div contient toute les taches
    const tasksListElement = document.querySelector('.tasks');
    // et j'ajoute la nouvelle
    tasksListElement.prepend(taskElement);

  }


}