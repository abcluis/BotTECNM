/**
 * Created by usuario1 on 6/21/2017.
 */

module.exports = {
    createBody:        createBody,
    createCard:        createCard,
    createButtonBlock: createButtonBlock,
    createText: createText
};

function createBody() {
    return {
        "messages": []
    }
}
function createText(text) {
    return  {
        "text": text
    }
}

function createCard(text) {
    return {
        "attachment": {
            "type":    "template",
            "payload": {
                "template_type": "button",
                "text":          text,
                "buttons":       []
            }
        }
    }
}

function createButtonBlock(name, text) {
    return {
        "type":       "show_block",
        "block_name": name,
        "title":      text
    }
}
