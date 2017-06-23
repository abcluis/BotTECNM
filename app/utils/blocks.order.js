/**
 * Created by usuario1 on 6/23/2017.
 */

let BLOCKS = require('./blocks.constants');

module.exports = nextBlock;

function nextBlock(BLOCK) {

    let arreglo = Object.keys(BLOCKS).map(key => BLOCKS[key]);
    let actual = arreglo.indexOf(BLOCK);

    if(actual === arreglo.length - 1){
        return BLOCK;
    }
    return arreglo[++actual];

}