/**
 * Created by usuario1 on 6/21/2017.
 */

module.exports = {
    createBody:        createBody,
    createCard:        createCard,
    createButtonBlock: createButtonBlock,
    createText:        createText
};


/**
 * Create a body empty for chatfuel
 * @returns {{messages: Array}}
 */
function createBody() {
    return {
        "messages": []
    }
}

/**
 * Create a simple text message
 * @param text  it is the text that will carry the message
 * @returns {{text: *}}
 */
function createText(text) {
    return {
        "text": text
    }
}
/**
 * Create a card for chatfuel
 * @param text it is the text that will carry the card
 * @returns {{attachment: {type: string, payload: {template_type: string, text: *, buttons: Array}}}}
 */
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

/**
 * Create a button for chatfuel
 * @param name, the name of the chatfueld block that will redirect
 * @param text, text of button
 * @returns {{type: string, block_name: *, title: *}}
 */
function createButtonBlock(name, text) {
    return {
        "type":       "show_block",
        "block_name": name,
        "title":      text
    }
}
