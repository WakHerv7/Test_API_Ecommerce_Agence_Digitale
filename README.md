# Test_API_Ecommerce_Agence_Digitale
Test API Ecommerce Agence Digitale

## Lien GITHUB du projet:
https://github.com/WakHerv7/Test_API_Ecommerce_Agence_Digitale
## Technologies utilisées:
- AdonisJs
- Sqlite
## POURQUOI CHOISIR ADONISJS ?
AdonisJs fournit de nombreux outils prêts à l'emploi tels que l'ORM Lucid, l'authentification, la validation des formulaires, et la gestion des sessions, ce qui accélère le processus de développement.
De plus ayant de l'experience avec le framework Laravel en PHP, il m'a été aisé de rapidement prendre la main sur AdonisJs, parce qu'il a une architecture tres similaire.

### Pourquoi choisir sqlite ?
 Pour faciliter le lancement du projet.

## Recommandation pour lancer le projet:

1- creer un fichier .env  et y copier le contenu du fichier .env.example

`cp .env.example .env`    

2-  `npm install`

3- `node ace migration:run`

3- `npm run dev`

4- Dans votre navigateur aller sur `http://localhost:3333/docs`


## Ordre chornologique des actions à effectuer

 1- S'enregistrer en tant que utilisateur

 2- Se logger

 3- Creer une ou plusieurs categories (Category)

 4- Creer un ou plusieurs produits (Product)

 4- Ajouter un ou plusieurs paniers (Cart) à un utilisateur