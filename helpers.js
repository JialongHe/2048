export function getNumberBackgroundColor(n) {
    switch (n) {
        case 2: 
            return "#eee4da"; 
        case 4:
            return "#ede0c8";
        case 8:
            return "#f2b179";
        case 16:
            return "#f59563";
        case 32:
            return "#f67c5f";
        case 64:
            return "#f65e3b";
        case 128:
            return "#edcf72";
        case 256:
            return "#edcc61";
        case 512:
            return "#9c0";
        case 1024:
            return "#33b5e5";
        case 2048:
            return "#09c";
        case 4096:
            return "#a6c";
        default:
            return "#ccc0b3";
    }
}

export function getNumberColor(n) {
    if (n <= 4) {
        return "#776e65";
    }
    return "white";
}

export function getPosTop(i, extraOffset = 0) {
    return 20 + i * 120 + extraOffset + 'px';
}

export function getPosLeft(j, extraOffset = 0) {
    return 20 + j * 120 + extraOffset + 'px';
}