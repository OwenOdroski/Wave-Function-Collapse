var size = 14
var c = document.createElement('canvas')
c.setAttribute('id', 'wfc-canvas')
document.body.appendChild(c)

var ctx = c.getContext("2d")
var source = [
    [
        ['#', '@', '#'],
        ['#', '@', '#'],
        ['#', '@', '#']
    ],
    [
        ['#', '#', '#'],
        ['@', '@', '@'],
        ['#', '#', '#']
    ],
    [
        ['#', '#', '#'],
        ['@', '@', '#'],
        ['#', '@', '#']
    ],
    [
        ['#', '#', '#'],
        ['#', '@', '@'],
        ['#', '@', '#']
    ],
    [
        ['#', '@', '#'],
        ['#', '@', '@'],
        ['#', '#', '#']
    ],
    [
        ['#', '@', '#'],
        ['@', '@', '#'],
        ['#', '#', '#']
    ],
    [
        ['#', '@', '#'],
        ['@', '@', '@'],
        ['#', '@', '#']
    ],
    [
        ['#', '@', '#'],
        ['@', '@', '#'],
        ['#', '@', '#']
    ],
    [
        ['#', '@', '#'],
        ['#', '@', '@'],
        ['#', '@', '#']
    ],
    [
        ['#', '@', '#'],
        ['@', '@', '@'],
        ['#', '#', '#']
    ],
    [
        ['#', '#', '#'],
        ['@', '@', '@'],
        ['#', '@', '#']
    ],
    [
        ['%', '%', '%'],
        ['%', '%', '%'],
        ['%', '%', '%']
    ]
]
var tiles = [
    [],
    [],
    []
]
var sides = [
    [1, 3, 4, 6, 8, 9, 10],
    [1, 2, 5, 6, 7, 9, 10],
    [0, 4, 5, 6, 7, 8, 9],
    [0, 2, 3, 6, 7, 8, 10] 
]
var tlb = [
    [0, 4, 8],
    [1, 2, 10],
    [6, 7, 9],
    [3, 11]
]
var bl = [
    [10, 8, 7, 6, 2, 0],
    [10, 9, 6, 4, 3, 1]
]

c.width = (size * 3) * 10
c.height = (size * 3) * 10

function createTile(x, y, num) {
    for(let i = 0; i < 3; i++) {
        for(let u = 0; u < 3; u++) {
            if(source[num][i][u] == '@') {
                ctx.fillStyle = "#000000"
                ctx.fillRect((u * 10) + x, (i * 10) + y, 10, 10)
                tiles[0].push(u)
                tiles[1].push(i)
                tiles[2].push(source[num][i][u])
            } else if(source[num][i][u] == '%') {
                createBuildings((u * 10) + x, (i * 10) + y)
                tiles[0].push(u)
                tiles[1].push(i)
                tiles[2].push(source[num][i][u])
            } else {
                tiles[0].push(u)
                tiles[1].push(i)
                tiles[2].push(source[num][i][u])
            }
        }
    }
}

function createBuildings(x, y) {
    ctx.fillStyle = '#964B00'
    ctx.fillRect(x, y, 10, 10)
}
var wfc = {
    start: function() {
        let top = []
        let lastY = []
        let last = 6

        for(let i = 0; i < size; i++) {
            let rand = sides[1][Math.floor(Math.random() * sides[0].length)]
            createTile(i * 30, -30, rand)
            top.push(rand)
        }
        for(let i = 0; i < size; i++) {
            let rand = sides[1][Math.floor(Math.random() * sides[0].length)]
            createTile(-30, (i * 30), rand)
            lastY.push(rand)
        }
        for(let u = 0; u < size; u++) {
            for(let i = 0; i < size; i++) {
                let type = {
                    top: false,
                    left: false
                }

                if(bl[0].includes(top[i])) {
                    type.top = true
                }
                if(i == 0) {
                    last = lastY[u]
                }
                if(bl[1].includes(last)) {
                    type.left = true
                }

                if(type.top && type.left) {
                    let rand = tlb[2][Math.floor(Math.random() * tlb[2].length)]
                    createTile(i * 30, u * 30, rand)
                    last = rand
                } else if(type.top && !type.left) {
                    let rand = tlb[0][Math.floor(Math.random() * tlb[0].length)]
                    createTile(i * 30, u * 30, rand)
                    last = rand
                } else if(!type.top && type.left) {
                    let rand = tlb[1][Math.floor(Math.random() * tlb[1].length)]
                    createTile(i * 30, u * 30, rand)
                    last = rand
                } else {
                    let rand = tlb[3][Math.floor(Math.random() * tlb[3].length)]
                    createTile(i * 30, u * 30, rand)
                    last = rand
                }
            }
        }
    },
    size: function(value) {
        size = value
        c.width = (size * 3) * 10
        c.height = (size * 3) * 10
    },
    canvas: function(name) {
        c.setAttribute('id', name)
    },
    tiles: function() {
        var obj = {
            x: tiles[0],
            y: tiles[1],
            tile: tiles[2]
        }

        return obj
    }
}
