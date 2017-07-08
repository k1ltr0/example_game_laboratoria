# game

[Work in progress]

Inspirado en:

* https://github.com/mozdevs/gamedev-js-tiles
* https://developer.mozilla.org/en/docs/Games/Techniques/Tilemaps

## Cómo añadir personajes

1. Crear carpeta en characters
2. Crear achivo js en nueva carpeta
3. Implementar factory que use `hero()` para crear un nuevo objeto
4. Añadir imagen del personaje (png 64x64)
5. Añadir el script en `index.html`
6. Cargar el personaje en `main.js`

### Pistas

* La función `hero(map, x, y)` retorna una objeto con los siguientes métodos:
  * `obj.name(str)`: setea el nombre de tu personaje
  * `obj.voice(str)`: setea la voz de tu personaje
  * `obj.say()`: dice "hola soy <name>"
  * `obj.getVoices(cb)`
* Debes asignar la propiedad `image` tu factory (la función que crea el personaje).
* Puedes re-emplazar la implementación de `obj.say` con la tuya propia. Si lo
  haces, asegúrate de que igual invocas `obj.say` en el objeto original.
* Para saber qué voces hay disponibles, puedes usar `obj.getVoices()`. Éste
  método recibe un callback como único argumento  invoca al callback con la
  lista de voces disponibles.
