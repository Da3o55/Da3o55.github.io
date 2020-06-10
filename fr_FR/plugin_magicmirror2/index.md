# Plugin MagicMirror²

![Icon](magicmirror2_icon.png){:height="100px" width="100px"}

[ChangeLog](changelog)

## C'est quoi MagicMirror² ?

C'est un developpement opensource permettant des projets DIY de type mirroir magic.
Pour plus d'informations : [MagicMirror²](https://magicmirror.builders/)

De nombreux modules permettent d'étentre les fonctionnalités.
[Modules pour MagicMirror²](https://github.com/MichMich/MagicMirror/wiki/3rd-party-modules)

## Pré-requis

Pour utiliser ce plugin sous jeedom vous devez disposer d'au moins un objet connecté de type MagicMirror².
Il vous faudra également avoir installé, configuré et vérifié le bon fonctionne du plugin MMM-Remote-Control.
Ce plugin utilise l'api du module MMM-Remote-Control pour communiquer avec l'équipement.

Cette documentation ne traite en aucun le périmettre du MagicMirror² !

## Installation du plugin

Le plugin est pour le moment en béta, il faudra donc activer la possibilité d'installer ces versions sur votre Jeedom.
Pour cela la documentation de jeedom est disponible.

## Configuration

Pas de configuration particulière pour ce plugin.

## Ajout d'un nouveau MagicMirror²

Cliquez sur "Ajouter", puis saisir le nom de l'objet

![doc1](images/doc1.png)

![doc2](images/doc2.png)

Une fois l'objet créé, configurez celui-ci.

Dans un premier temps vous retrouverez les élements classiques d'un objet Jeedom.
- Son nom
- L'oject parent
- Catégorie
- Activation/Désactivation  & Visible/Invisible

Ensuite, les élements de configuration spécifique à ce MagicMirror².
- Son adresse IP et le boutton pour tester l'accès  l'api
- Le type de notification souhaité vers ce MagicMirror²
- Le délai d'affchichage de la notification.
- L'activation/désactivation de la prise en charge du module MMM-BackgroundSlideshow

![doc3](images/doc3.png)

Pour pouvoir sauvegarder votre objet, il faudra obligatoirement, l'ip, avoir testé avec succès la disponibilité de l'api, le délai de la notification.

## Les commandes

- **Eteindre** : Exécute un arrêt de l'équipement (shutdown)

- **Redémarer** : Redémarer l'équippement (reboot)

- **Remote.html** : Ouvre la page de menu du module MMM-Remote-Control installé sur le MagicMirror²

- **Rafrachir HTML** : Recharge la page d'afficage du MagicMirror².

- **Recharger** : Recharge le programme MagicMirror² sur l'équipement distant.

- **Rafraichir** : Rafraichit l'affichage et les données de la tuile jeedom de l'équipement.

- **Statut** : Affiche le statut global de l'équipement (get http)

- **Affichage** : Statut de l'affichage de l'équipement distant.

- **Masquer laffichage** : Afficher ou Masquer l'affichage distant.

- **Notification** : Envoie une notification vers l'équipement, ALERT ou NOTIFICATION en fonction de la configuration de votre objet dans Jeedom.

- **Fond décran** : Statut du fond d'écran de l'équipement distant.

- **Masquer fond décran** : Afficher ou Masquer le fond d'écran sur l'équipement distant.

## Le widget

![tuile](images/tuile.png)


## Problème(s) connu(s)

### Commande "Recharger" ne fonctionne pas
(merci @mmourcia)

L'erreur peut provenir de votre MagicMirror².

Dans les logs de ce dernier vous devriez constater les lignes suivantes:
'''
0|mm  | [2020-06-07 12:47:44.515] [ERROR]  
0|mm  | Error: Cannot find module 'pm2'
0|mm  | Require stack:
0|mm  | - /home/pi/MagicMirror/modules/MMM-Remote-Control/node_helper.js
0|mm  | - /home/pi/MagicMirror/js/app.js
0|mm  | - /home/pi/MagicMirror/js/electron.js
0|mm  | - /home/pi/MagicMirror/node_modules/electron/dist/resources/default_app.asar/main.js
0|mm  | - 
0|mm  |     at Module._resolveFilename (internal/modules/cjs/loader.js:627:15)
0|mm  |     at Function.Module._resolveFilename (/home/pi/MagicMirror/node_modules/electron/dist/resources/electron.asar/common/reset-search-paths.js:41:16)
0|mm  |     at Function.Module._resolveFilename (/home/pi/MagicMirror/node_modules/module-alias/index.js:49:29)
0|mm  |     at Function.Module._load (internal/modules/cjs/loader.js:531:27)
0|mm  |     at Module.require (internal/modules/cjs/loader.js:685:19)
0|mm  |     at require (internal/modules/cjs/helpers.js:16:16)
0|mm  |     at Class.controlPm2 (/home/pi/MagicMirror/modules/MMM-Remote-Control/node_helper.js:867:23)
0|mm  |     at Class.executeQuery (/home/pi/MagicMirror/modules/MMM-Remote-Control/node_helper.js:654:22)
0|mm  |     at /home/pi/MagicMirror/modules/MMM-Remote-Control/node_helper.js:152:39
0|mm  |     at Layer.handle [as handle_request] (/home/pi/MagicMirror/node_modules/express/lib/router/layer.js:95:5)
'''
Voici la commande à executé dans le répertoire du module MMM-Remote-Control côté MagicMirror² :

>npm link pm2








