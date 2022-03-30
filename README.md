# Pokemons Matthieu Polan
Ce TP possède 3 parties (/Release).  
Cf https://bisonfoutu.github.io/ng-reveal

## Les Releases Final du projet : 
1. Final-TP3
2. Final-TP3
3. Final-TP4

## Observation TP4 : 
J'ai crée 3 modules : Pokemon, Authentification, Team.  
##### Authentification module
Dans le module Authentification on retrouve un component qui permet de se connecter a l'aide d'une dialog  
et aussi un service contenant toutes les fonctions en rapport avec l'authentification.  

##### Pokemon module
Comme dans le TP2 et TP3, on y retrouve plusieurs composant pour afficher les pokemons.  
Il contient en plus le service pokemon qui permet d'effectuer tous les appels pour les get/post/delete.  
Remarque : on retrouve dans ce module l'appel au composant list-team qui affiche notre équipe de pokemon.  
C'est dans le composant pokemon-détail que l'on accède au button pour se connecter en trainer.

##### Team module
Ce module comporte un composant (team-list) et un service. La team-list de nos pokemons ne s'affiche que si on est connecté.  
Il est possible d'ajouter un pokemon à la list directement depuis le composant list-pokemon du module Pokemon.  
Pour en supprimer un, on click sur le moins dans la team-list.  

## Principale Difficulté rencontrée : 
##### Binding pour la list des pokémons de ma team.  
En effect, la récuperetion de cette list se fait dans le service du module team, on l'envoie dans le composant  
pokemon-list via le composant pokemon pour l'afficher.  
Mais l'ajout et la suppression d'un pokémon se faisant pas au même endroit (module pokemon via le service team pour l'un et   
pour l'autre module team via le service team) il faut donc faire un two way binding.  
La team-list est donc a la fois en @INPUT mais aussi en @OUTPUT.
La team-list est fonctionnelle avec cette implémentation. 

##### Autre Remarque:
Pour la gestion de la connection j'ai utilisé le localstorage pour stocker les tokens.  
Je vérifie qu'ils sont présents et non expirés. Il aurait été possible de vérifier en plus leur validité,   
mais si ils sont faux de toute facon les appels api planteront.  
