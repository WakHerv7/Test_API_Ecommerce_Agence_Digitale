# Test_API_Ecommerce_Agence_Digitale
Test API Ecommerce Agence Digitale

# Lien GITHUB du projet:
https://github.com/WakHerv7/Test_API_Ecommerce_Agence_Digitale
# Technologies utilisées:
- AdonisJs
- MYSQL
# POURQUOI CHOISIR ADONISJS ?
AdonisJs fournit de nombreux outils prêts à l'emploi tels que l'ORM Lucid, l'authentification, la validation des formulaires, et la gestion des sessions, ce qui accélère le processus de développement.
De plus ayant de l'experience avec le framework Laravel en PHP, il m'a été aisé de rapidement prendre la main sur AdonisJs, parce qu'il a une architecture tres similaire.

# Recommandation pour lancer le projet:

1- ajouter le fichier .env avec ce contenu (remplacer root et password par vos valeurs propre à votre installation MYSQL)

PORT=3333

HOST=0.0.0.0

NODE_ENV=development

APP_KEY=vsEM-kfFSv3J2aop7CgHRb1iv38qyPrW

DRIVE_DISK=local

DB_CONNECTION=mysql

MYSQL_HOST=127.0.0.1

MYSQL_PORT=3306

MYSQL_USER=root

MYSQL_PASSWORD=password

MYSQL_DB_NAME=test_ecommerce_db




2-  npm install

3- npm run dev

4- Dans votre navigateur aller sur http://localhost:3333/docs


# Ordre chornologique des actions à effectuer

 1- S'enregistrer en tant que utilisateur

 2- Se logger

 3- Creer une ou plusieurs categories (Category)

 4- Creer un ou plusieurs produits (Product)

 4- Ajouter un ou plusieurs paniers (Cart) à un utilisateur