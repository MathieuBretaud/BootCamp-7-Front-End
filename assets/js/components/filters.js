const filters = {


        init: function () {
            // ici on voudrait pouvoir ajouter des ecouteurs d'évenements sur toutes les taches
            //tasksList.bindAllTasksEvents();
            tasksList.loadArchivedFromAPI();
            console.log('je suis dans filter');
        },
        // Chargement des taches depuis notyre API
        loadArchivedFromAPI: function () {

            // on prépare la configuration de la requête HTTP
            const config = {
                method: 'GET',
                mode: 'cors', // sécu, a voir en e07
                cache: 'no-cache' // no-cache en dev, mais pas en prod ! 
            };

            fetch(app.apiRootUrl + '/tasks', config)
                .then(
                    function (response) {
                        return response.json();
                    }
                )
                .then(
                    function (archivedDataFromAPI) {
                        console.log(archivedDataFromAPI);

                        // boulce qui va parcourir le resultat de notre requete qui a été convertis !
                        // a chaque tour de boucle je récupère un tableau associatif qui représente une tache
                        for (const singleTask of tasksDataFromAPI) {
                            // a chaque tour de boucle j'utilise deux methode que j'ai déja créé, une qui permet de fabriquer un nouvel élement tache, et une autre qui permet d'injecter une tache dans la liste des taches 
                            const newTaskElement = task.createTaskElement(singleTask.title, singleTask.category.name, singleTask.id, singleTask.completion, singleTask.status);
                            tasksList.insertTaskIntoTasksList(newTaskElement);

                        }

                    }
                );


        }
    }