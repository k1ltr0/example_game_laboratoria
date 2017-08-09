# game

[Work in progress]

Inspirado en:

* https://github.com/mozdevs/gamedev-js-tiles
* https://developer.mozilla.org/en/docs/Games/Techniques/Tilemaps

## Cómo añadir personajes

1. Crear carpeta en characters
2. Crear achivo js en nueva carpeta
3. Implementar constructor que herede de `Hero`
4. Añadir imagen del personaje (png 64x64)
5. Añadir el script en index.html
6. Cargar el personaje en main.js

### Pistas

* Puedes asignar las siguientes propiedades de instancia para modificar tu
  personaje:
  * `this.name`
  * `this.voice`
* Debes asignar la propiedad `image` al prototipo del constructor de tu
  personaje.
* Puedes re-emplazar la implementación de `Hero.prototype.say` con la tuya
  propia en el prototipo de tu constructor. Si lo haces, asegúrate de que igual
  se invoca `Hero.prototype.say`.
* Para saber qué voces hay disponibles, puedes usar `this.getVoices()`. Éste
  método recibe un callback como único argumento  invoca al callback con la
  lista de voces disponibles.
