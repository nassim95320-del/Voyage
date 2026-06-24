# 🦷 ODONTIA — Les Gardiens de l'Émail

RPG éducatif pour **tout maîtriser et retenir** le cours sur les **lésions carieuses**
(UE2 — Odontologie restauratrice, CM6). L'étudiant est un Gardien miniaturisé qui défend
le Royaume d'Odontia contre l'armée bactérienne menée par *Streptococcus Mutans*.

## 🎮 Fonctionnalités
- **🗺️ Carte du monde** : une dent en coupe, 6 missions + 1 boss final, déverrouillage progressif (≥ 80 %).
- **📖 Codex** : tout le cours réécrit, structuré en tableaux mémorisables, fidèle au PDF.
- **🃏 Flashcards de combat** : révision active (retournement + répétition espacée simplifiée).
- **🏆 Boss / Quiz** : QCM avec jauge de **PV d'Émail**, score, correction justifiée, XP.
- **💾 Sauvegarde** : progression, XP, grades et badges dans le navigateur (localStorage).

## 🚀 Lancer le projet
```bash
npm install
npm run dev      # serveur de développement (http://localhost:5173)
npm run build    # build de production dans dist/
npm run preview  # prévisualiser le build
```

## 🗂️ Structure
```
content/missions.md     # contenu pédagogique source (rédactionnel)
src/data/missions.js    # données structurées (codex, flashcards, quiz)
src/useGame.js          # état de jeu + sauvegarde localStorage
src/components/         # HUD, WorldMap, MissionView, Codex, Flashcards, Quiz, Badges
src/styles/index.css    # thème RPG
```

## 🧭 Les missions
1. **L'Aube du Gardien** — définitions + 4 stades évolutifs
2. **La Balance Sacrée** — Keyes/König, facteurs, déminéralisation ↔ reminéralisation
3. **L'Armée de l'Ombre** — biofilm, PAE, 3 familles bactériennes, virulence du S. Mutans
4. **La Forteresse de Salive** — facteur hôte + salive
5. **Le Siège du Temps** — alimentation, courbes de Stephan, RCI/CAMBRA
6. **Le Grand Codex** — nomenclature FDI + classifications (Black, Mount & Hume, SiSta, ICDAS)
7. **👑 Boss final** — cas clinique de synthèse

> Contenu pédagogique d'après le cours du Pr. C. Mesgouez-Menez & C. Gaucher.
