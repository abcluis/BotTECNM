module.exports = nextBlock;

/**
 * Created by usuario1 on 6/23/2017.
 */

let blocks = require('./blocks.constants');

let BLOCK_FINAL = 'finish';

function ifActualExist(block, options) {
    switch (options.actual_activity + '-' + block) {

        case 'Trabaja-' + blocks.BLOCK_ACTUAL_ACTIVITY:

            return blocks.BLOCK_TIME_GETJOB;

            break;
        case 'Estudia-' + blocks.BLOCK_ACTUAL_ACTIVITY:

            return blocks.BLOCK_ACTIVITY_STUDIES;

            break;
        case 'Estudia y trabaja-' + blocks.BLOCK_ACTUAL_ACTIVITY:

            return blocks.BLOCK_ACTIVITY_STUDIES;

            break;
        case 'No estudia o trabaja-' + blocks.BLOCK_ACTUAL_ACTIVITY:
            return blocks.BLOCK_INTRO_IV;

            break;
        case 'Estudia y trabaja-' + blocks.BLOCK_SPECIALITY_INST:
            return blocks.BLOCK_TIME_GETJOB;

            break;
        case 'Estudia-' + blocks.BLOCK_SPECIALITY_INST:
            return blocks.BLOCK_INTRO_IV;

            break;

    }
}

function ifOptionsExist(block, options) {
    if (options.actual_activity !== undefined) {
        return ifActualExist(block,options);
    } else if (options.economic_sector !== undefined) {
        switch (options.economic_sector + '-' + block) {
            case 'Sector secundario-' + blocks.BLOCK_ECONOMIC_SECTOR:

                return blocks.BLOCK_SECONDARY_SECTOR;

                break;
            case 'Sector terciario-' + blocks.BLOCK_ECONOMIC_SECTOR:

                return blocks.BLOCK_TERTIARY_SECTOR;
                break;
            case 'Sector primario-' + blocks.BLOCK_ECONOMIC_SECTOR:

                return blocks.BLOCK_PRIMARY_SECTOR;

                break;
        }
    }else if(options.courses !== undefined){
        return options.courses ? blocks.BLOCK_WHAT_COURSES : blocks.BLOCK_POSTGRADUATE;
    }else if(options.postgraduate !== undefined){
        return options.postgraduate ? blocks.BLOCK_WHAT_POSTGRADUATE : blocks.BLOCK_INTRO_VI;
    }else if(options.belongs_orgs !== undefined){
        return options.belongs_orgs ? defaultNextBlock(block) : blocks.BLOCK_BELONGS_PRO_ORGS;
    }else if(options.belongs_pro_orgs !== undefined){
        return options.belongs_pro_orgs ? defaultNextBlock(block) : blocks.BLOCK_BELONGS_ASSOCIATION;
    }else {
        return defaultNextBlock(block);
    }

}

function nextBlock(block, options) {



    if (options !== undefined) {

        return ifOptionsExist(block, options);

    } else {
        return defaultNextBlock(block);
    }

}

function defaultNextBlock(block) {

    let arreglo = Object.keys(blocks).map(key => blocks[key]);
    let actual  = arreglo.indexOf(block);

    switch (block) {
        case blocks.BLOCK_PRIMARY_SECTOR:
            return blocks.BLOCK_COMP_ORGSIZE;
            break;
        case blocks.BLOCK_SECONDARY_SECTOR:
            return blocks.BLOCK_COMP_ORGSIZE;
            break;
        default :
            if (actual === arreglo.length - 1) {
                return BLOCK_FINAL;
            }
            return arreglo[++actual];
            break;
    }
}
