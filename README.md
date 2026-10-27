# Site iatop.eu (IA Top)

Site vitrine one-page de **IA Top**, l'activité de bras droit de dirigeants de Jean-Philippe Barret.
Le site est fait de fichiers simples (HTML, CSS, JavaScript). Il n'y a rien à installer ni à « compiler » :
ce qui est dans ce dossier est exactement ce qui est mis en ligne.

---

## 1. Ce que contient le dossier

| Fichier ou dossier | À quoi il sert |
|---|---|
| `index.html` | La page d'accueil (tous les textes du site) |
| `mentions-legales.html` | La page des mentions légales |
| `404.html` | La page affichée quand une adresse n'existe pas |
| `css/style.css` | Les couleurs, les polices et la mise en page |
| `js/main.js` | Les petites animations, le menu mobile et le calendrier cal.com |
| `assets/img/` | Logo, favicon, image de partage, photo |
| `assets/fonts/` | Les polices Newsreader et Schibsted Grotesk (licence libre OFL) |
| `favicon.ico`, `robots.txt`, `sitemap.xml`, `.htaccess` | Fichiers techniques (référencement, serveur) |
| `charte-ia-top/` | La charte graphique. **Ce dossier n'est pas envoyé sur GitHub ni mis en ligne** (il est listé dans `.gitignore`). |

---

## 2. Voir le site sur votre ordinateur

**Méthode rapide :** double-cliquez sur `index.html`. Le site s'ouvre dans votre navigateur.

**Méthode recommandée, dans VS Code (extension Live Server) :**

1. Dans VS Code, cliquez sur l'icône **Extensions** dans la barre de gauche (les 4 petits carrés).
2. Cherchez **Live Server** (auteur : Ritwick Dey) et cliquez sur **Installer**.
3. Ouvrez le dossier du site dans VS Code (**Fichier > Ouvrir le dossier…**).
4. Faites un clic droit sur `index.html` puis **Open with Live Server**.
5. Le site s'ouvre dans le navigateur et se met à jour tout seul à chaque fois que vous enregistrez un fichier.

> En local, la redirection vers https et la page 404 ne s'appliquent pas : c'est normal, elles ne
> fonctionnent que sur le serveur OVH.

---

## 3. Modifications courantes

### La photo de Jean-Philippe

La photo actuelle vient de la médiathèque du site secutop.fr (photo « Jean-Philippe Barret », fauteuil et journaux anciens).
Elle existe en deux versions, dans le dossier **`assets/img/`** :

| Fichier | Où elle apparaît | Format |
|---|---|---|
| `photo-jp.jpg` | En haut de page | Portrait 4:5, 960 × 1200 px |
| `photo-jp-gros-plan.jpg` | Section « Ce que j'apporte » | Gros plan 4:5, 800 × 1000 px |

Pour la remplacer : préparez une photo au même format (portrait 4:5), en JPG de moins de 300 Ko si possible
(le site [squoosh.app](https://squoosh.app) permet de l'alléger gratuitement), donnez-lui **exactement le même nom**
et remplacez l'ancien fichier. Les photos sont affichées en couleur naturelle, sans aucun filtre.
Si une photo manque, un monogramme « IA » s'affiche à sa place.

### Les logos des entreprises

Ils sont dans **`assets/img/logos/`** (format WebP, récupérés sur les sites officiels de chaque entreprise ou réseau).
On les retrouve dans la bande « Entreprises », la chronologie, les Engagements (DCF, Groupama, Réseau Divergent) et la fiche du cas client.
Ils s'affichent en gris et reprennent leurs couleurs au survol de la souris. Pour en changer un, remplacez le fichier
en gardant le même nom. La bande des logos est dans `index.html`, juste après le commentaire « ENTREPRISES ».

### Modifier un texte

Tous les textes sont dans **`index.html`**. Utilisez **Ctrl + F** dans VS Code pour retrouver la phrase à changer,
modifiez-la entre les balises (par exemple entre `<p>` et `</p>`) sans toucher aux balises elles-mêmes, puis enregistrez.

Repères utiles dans `index.html` :

- ligne 6 : le titre de la page dans Google ; ligne 7 : la description dans Google ;
- ligne 202 : le texte d'introduction du haut de page ;
- ligne 559 : le témoignage de Maxime Balouzat ;
- ligne 580 : début des questions de la FAQ.

> **Attention à la FAQ :** les questions et réponses existent en double, une fois dans la page (vers la ligne 580)
> et une fois dans le bloc « Données structurées » en haut du fichier (à partir de la ligne 99, pour Google).
> Si vous modifiez une question ou une réponse, modifiez-la **aux deux endroits, à l'identique**.

### Changer une couleur

Les couleurs sont regroupées en haut de **`css/style.css`**, lignes 18 à 23 :

```css
--papier: #F3EEE5;      /* fond principal */
--lin: #E7E0D3;         /* fonds alternés */
--encre: #16130F;       /* texte principal, sections sombres */
--graphite: #5D5850;    /* texte secondaire sur fond clair */
--grege: #B5AEA2;       /* texte secondaire sur fond sombre */
--vermillon: #E0482A;   /* accent : flèches, I et A, bloc rendez-vous */
```

Remplacez le code (par exemple `#E0482A`) par la nouvelle couleur : tout le site suit.
Si vous changez une couleur, pensez aussi à la charte graphique (et à la régénérer, voir section 6).
Pensez à garder un bon contraste (vérifiable sur [webaim.org/resources/contrastchecker](https://webaim.org/resources/contrastchecker/)).

### Le calendrier de rendez-vous

Il est géré par cal.com (compte `jbarret`, événement `15min`). Les horaires, la durée et les questions posées
se règlent directement dans votre compte cal.com, pas dans le site. Le lien utilisé est dans `js/main.js`, ligne 176.

---

## 4. Mise en ligne (GitHub → OVH)

Le site est relié à GitHub (dépôt `AceOSolo/ia-top`) et OVH est relié à ce dépôt.
**Chaque modification envoyée sur GitHub (branche `main`) est déployée automatiquement sur OVH**,
en général en quelques minutes.

Dans VS Code :

1. Cliquez sur l'icône **Contrôle de code source** dans la barre de gauche (les trois ronds reliés).
2. Écrivez un court message qui décrit la modification (ex. « Ajout de la photo »).
3. Cliquez sur **Valider** (Commit), puis sur **Synchroniser les modifications** (Push).

### ⚠️ IMPORTANT, avant la toute première mise en ligne : activer le certificat SSL

Le fichier `.htaccess` redirige automatiquement tous les visiteurs vers **https://iatop.eu**.
**Si le certificat SSL (HTTPS) n'est pas activé, le site sera inaccessible.**

Dans l'espace client OVH :

1. **Web Cloud > Hébergements**, puis votre hébergement.
2. Onglet **Multisite** : sur la ligne `iatop.eu` (et `www.iatop.eu`), vérifiez que la colonne **SSL** est **activée**.
   Sinon, cliquez sur les « … » de la ligne, **Modifier le domaine**, cochez **SSL**, validez.
3. Onglet **Informations générales** : à la ligne **Certificat SSL**, cliquez sur **Commander un certificat SSL**
   puis choisissez le certificat **gratuit (Let's Encrypt)**.
4. Attendez que le certificat soit actif (de quelques minutes à quelques heures), **puis** faites la première mise en ligne.

Vérification : ouvrez `https://iatop.eu` ; le petit cadenas doit apparaître dans la barre d'adresse.

### Après la mise en ligne

- Testez l'aperçu de partage (image et texte) sur [linkedin.com/post-inspector](https://www.linkedin.com/post-inspector/).
- Déclarez le site dans [Google Search Console](https://search.google.com/search-console) et indiquez-y
  l'adresse du plan du site : `https://iatop.eu/sitemap.xml`.
- Si vous modifiez le site plus tard, mettez à jour la date `lastmod` dans `sitemap.xml`.

---

## 5. Les polices

Les polices **Newsreader** (titres, serif de presse) et **Schibsted Grotesk** (texte, dessinée pour un groupe de presse)
sont hébergées sur le site, dans `assets/fonts/`. Elles ont été téléchargées depuis le dépôt officiel Google Fonts
et allégées (alphabet latin, graisses utiles). Aucun appel n'est fait à Google : rien à faire de votre côté.
Les licences (OFL) sont jointes dans le même dossier.

---

## 6. La charte graphique (dossier `charte-ia-top/`)

Le dossier contient :

- `charte-ia-top.pdf` : la charte graphique complète (A4) ;
- `logos/svg/` : les 6 logos en vectoriel ;
- `logos/png/` : chaque logo en PNG à fond transparent, en 512, 1024 et 2048 px de large, et les favicons en 32, 180 et 512 px ;
- `polices/` : Newsreader et Schibsted Grotesk à installer sur un ordinateur (Word, PowerPoint, Canva…) ;
- `_sources/` : les fichiers qui ont servi à fabriquer le PDF et les images.

**Tous les PNG et le PDF sont déjà générés.** Il n'y a rien à faire.

👉 **Déposez le dossier `charte-ia-top/` complet sur Google Drive** pour le partager (graphiste, imprimeur, équipe).
Il ne part pas sur GitHub : c'est voulu.

### Si vous modifiez la charte et devez régénérer les fichiers

- **Le PDF seul, sans rien installer :** ouvrez `charte-ia-top/_sources/charte.html` dans Chrome ou Edge,
  faites **Imprimer**, choisissez **Enregistrer au format PDF**, format **A4**, marges **Aucune**,
  cochez **Graphiques d'arrière-plan**, puis enregistrez sous `charte-ia-top.pdf`.
- **Tout d'un coup (PNG, PDF, image de partage, icônes) :** il faut Python. Dans le terminal de VS Code :
  ```
  pip install playwright pillow fonttools skia-pathops
  python -m playwright install chromium
  python charte-ia-top/_sources/generer.py
  ```
  Le script redessine aussi les logos (`assets/img/logo.svg`, `logo-clair.svg`, `favicon.svg`, `monogramme.svg`),
  et régénère `assets/img/og-image.png`, `assets/img/apple-touch-icon.png` et `favicon.ico`.

---

## 7. ⚠️ Rappel : témoignage de Maxime Balouzat

Le témoignage de la section « Cas client » **ne doit être publié qu'après la validation écrite de Maxime Balouzat**
(un email de sa part suffit, à conserver).

Tant que cette validation n'est pas obtenue, ne mettez pas le site en ligne avec ce bloc, ou retirez-le :
dans `index.html`, supprimez tout ce qui va de `<figure class="testimonial"` jusqu'au `</figure>` suivant
(juste sous le commentaire « Témoignage : publication soumise à la validation écrite… », ligne 559).

---

## 8. Les animations

Les titres apparaissent mot par mot, le portrait se dévoile, la flèche de la méthode se trace du I vers le A,
une ligne vermillon avance le long de la chronologie et le témoignage s'allume au fil de la lecture.
Tout est désactivé automatiquement pour les visiteurs qui ont choisi « réduire les animations » sur leur appareil.

## 9. Confidentialité

Le site ne dépose **aucun cookie** et n'utilise **aucun outil de statistiques**.
La seule ressource externe est le calendrier cal.com, chargé uniquement quand le visiteur approche
de la section « Rendez-vous » (ou clique sur un bouton de rendez-vous).
