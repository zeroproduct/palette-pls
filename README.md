# Palette Pls
Generate a random color palette based on the top palettes on [ColourLovers.com](http://colourlovers.com/). Copy hex codes by clicking on the hex code text, or share specific palettes by copying a link when pressing Share.

## TODO
Currently we rely on the lib [nice-color-palettes](https://github.com/Jam3/nice-color-palettes) for an array of palettes. This array only updates once the maintainer decides to update the repository. A solution could be to create a microservice that pulls the latest top palettes that would populate a database. This microservice can be ran as a daily job, ensuring fresher results.