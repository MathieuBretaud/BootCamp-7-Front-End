const categoriesList = {

  apiBaseUrl: 'https://benoclock.github.io/S07-todolist',

  init: function(){
    console.log('je suis dans categoriesList.init');
    categoriesList.loadCategoriesFromAPI();
  },

  // methode permettant de renvoyer une liste déroulante.
  // 
  createSelectElement : function(categoriesList, defaultLabel, className = ''){
    // je fabrique un element select
    // Attention, l'element est seulement dans "selectElement"
    // mais n'est pas (encore) dans le dom
    const selectElement = document.createElement('select');
    // si on a donné un nom de classe, je l'applique au select
    if(className !== ''){
      selectElement.classList.add(className);
    }
    // creation de la première <option> en guise de valeur par defaut
    const defaultOption = document.createElement('option');
    defaultOption.textContent = defaultLabel;
    // "j'injecte" le option dans l'element select
    selectElement.append(defaultOption);
    // creation de tous les options grace a la liste "categoriesList"
    for (const category of categoriesList){
      // je fabrique un element option
      const optionElement = document.createElement('option');
      // je remplis son contenu texte avec le nom de la category
      optionElement.textContent = category.name;
      //! E07
      optionElement.value = category.id;
      // on "l'injecte" a l'élement select
      selectElement.append(optionElement);

    }

    return selectElement;

  },

  loadCategoriesFromAPI: function(){

    // on prépare la configuration de la requête HTTP
    const config = {
      method: 'GET',
      mode: 'cors', // sécu, a voir en e07
      cache: 'no-cache' // no-cache en dev, mais pas en prod ! 
    };

    // j'envoie ma requête !!
    // 1er argument de fetch : le endpoint vers lequel envoyer ma requête
    // 2eme arguemtn
    fetch(app.apiRootUrl + '/categories', config)
    // Ensuite, lorsqu'on reçoit la reponse au format JSON (texte)
      .then(
        // ici je rentre dans mon then lorsque ma requête va me donner une reponse
        // cette reponse est au format JSON (du texte brut dans lequel nous ne pouvons pas naviguer facilement (exemple reponse[0]['name'] va nous renvoyer une erreur ! ))
        function(response){
          //console.log(response);
          //etant donné que cette reponse n'est pas du texte brut organisé n'importe comment, mais ce texte est au format JSON
          // nous pouvons CONVERTIR cet reponse en entitée que l'on pourra facilement manipuler en javascript
          let object = response.json();
          return object;

        }
      )
      .then(
        function(categoriesDataFromAPI){
          console.log(categoriesDataFromAPI);
          
          // On a fabriqué une fonction qui nous permet de créer un élement select
         const selectFilterElement = categoriesList.createSelectElement(categoriesDataFromAPI, 'Choisir une catégorie', 'filters_choice');

         const selectAddTaskElement = categoriesList.createSelectElement(categoriesDataFromAPI, 'Choisir une catégorie');

          // je viens cibler la div qui contenait le select en dur (pour les filtres)
         const divheaderElement = document.querySelector('.filters .filters__task--category');
         divheaderElement.append(selectFilterElement);
         // je viens cibler la div qui contenait le select en dur (pour l'ajout de tache)
         const divElement = document.querySelector('.task--add .task__category .select');
         // et j'y insere le select !
         divElement.append(selectAddTaskElement);
         

        }

      );


  }


};


