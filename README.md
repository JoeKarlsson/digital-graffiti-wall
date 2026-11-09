# Digital Graffiti Wall

![Graffiti wall demo: people painting pixels on the shared grid in the browser](https://user-images.githubusercontent.com/4650739/97628255-74618a80-19fa-11eb-8c7e-0d7b24536d80.gif)

At a tech talk, the audience mostly sits there and types questions into a chat,
and I wanted everyone in the room to make something together instead. The
Digital Graffiti Wall let everyone paint on one shared canvas from their phones,
and every pixel lit up on a real LED grid. Someone starts drawing a shape and
others join in, or groups fight over the corners.

[Read the full statement](https://www.joekarlsson.com/work/digital-graffiti-wall/)

## Quick start

There's no build step. You need a MongoDB Realm app with anonymous sign-in on,
which is why it doesn't run today.

```sh
git clone https://github.com/JoeKarlsson/digital-graffiti-wall.git
cd digital-graffiti-wall
cp public/js/CONFIG_EXAMPLE.js public/js/CONFIG.js   # add your Realm app ID, database and collection
python3 -m http.server 3000                          # open http://localhost:3000
```

> **Retired:** the wall has been replaced by
> [PixelPane](https://www.joekarlsson.com/work/pixelpane/)
> ([source](https://github.com/JoeKarlsson/pixelpane)). MongoDB Realm has been
> shut down, so this code no longer runs as is. It's kept for reference.

## Development

| Path | What's in it |
| --- | --- |
| `index.html` | The page; loads the Realm Web SDK from unpkg |
| `public/js/MongoDB.js` | Anonymous sign-in, seeding the 1,024 pixel documents, reads and writes |
| `public/js/app.js` | The grid, painting and refreshing |
| `public/js/PaintSwatch.js`, `Erasers.js`, `colorArray.js` | The palette and erasers |

Each pixel is one MongoDB document with a color and an x, y coordinate, and
every screen reloads the grid every 5 seconds. The LED grid's code isn't in
this repo. GitHub Pages serves the site at graffitiwall.joekarlsson.com (see
`CNAME`).

## License

Apache 2.0. See [LICENSE](LICENSE).
