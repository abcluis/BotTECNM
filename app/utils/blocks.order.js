/**
 * Created by usuario1 on 6/23/2017.
 */

let BLOCKS = require('./blocks.constants');

module.exports = nextBlock;

let BLOCK_FINAL = 'finish';

function nextBlock(BLOCK, options) {

    let arreglo = Object.keys(BLOCKS).map(key => BLOCKS[key]);
    let actual = arreglo.indexOf(BLOCK);


    if(options){
        if(options.actual_activity){
            switch (options.actual_activity + '-' + BLOCK){

                case 'Trabaja-' + BLOCKS.BLOCK_ACTUAL_ACTIVITY:

                    return BLOCKS.BLOCK_TIME_GETJOB;

                    break;
                case 'Estudia-' + BLOCKS.BLOCK_ACTUAL_ACTIVITY:

                    break;
                case 'No estudia o trabaja-' + BLOCKS.BLOCK_ACTUAL_ACTIVITY:
                    return BLOCKS.BLOCK_INTRO_IV;

                    break;
                case 'Estudia-' + BLOCKS.BLOCK_SPECIALITY_INST:
                    return BLOCKS.BLOCK_INTRO_IV;

                    break;

            }
        }
        if(options.economic_sector){
            switch (options.economic_sector + '-' + BLOCK){
                case 'Sector secundario-' + BLOCKS.BLOCK_ECONOMIC_SECTOR:

                    return BLOCKS.BLOCK_SECONDARY_SECTOR;

                    break;
                case 'Sector terciario-' + BLOCKS.BLOCK_ECONOMIC_SECTOR:

                    return BLOCKS.BLOCK_TERTIARY_SECTOR;

                    break;
            }
        }

        if(options.courses){
            if(options.courses === true){
                return BLOCKS.BLOCK_WHAT_COURSES
            }else {
                return BLOCKS.BLOCK_POSTGRADUATE
            }
        }
    }

    switch (BLOCK){
        case BLOCKS.BLOCK_PRIMARY_SECTOR:
            return BLOCKS.BLOCK_COMP_ORGSIZE;
            break;
        case BLOCKS.BLOCK_SECONDARY_SECTOR:
            return BLOCKS.BLOCK_COMP_ORGSIZE;
            break;
    }



    if(actual === arreglo.length - 1){
        return BLOCK_FINAL;
    }
    return arreglo[++actual];

}