# Wave-Function-Collapse
A simple wave function collapse algorithm

Made to look like a layout of a city or small town, entirely in JavaScript.

Created with 10 pixel by 10 pixel tiles, put into small 3x3 grids. Randomized with certain conditions that it has to follow.

## Formatting
```
wfc.start()            # creates the tiles
wfc.size()             # sets the size of the canvas
wfc.canvas('canvas')   # sets the ID of the created canvas to 'canvas' (Default: 'wfc-canvas')
wfc.tiles()            # returns the tiles as an array (x: 'x position of tile', y: 'y position of the tiles', tile: 'type of tile')
```
