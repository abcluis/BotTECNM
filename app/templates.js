/**
 * Created by usuario1 on 6/21/2017.
 */

module.exports = {
    bodyChat:          bodyChat,
    textChat:          textChat,
    cardChat:          cardChat,
    buttonBlockChat:   buttonBlockChat,
    redirectChat:   redirectChat
};



function bodyChat() {

    this.add = function (text) {
        this.content.messages.push(text.content);
    };

    this.content = {
        "messages": []
    };
}


function textChat(text){

    this.content = {
        "text": text
    }
}

function cardChat(text){
    this.content = {
        "attachment": {
            "type":    "template",
            "payload": {
                "template_type": "button",
                "text":          text,
                "buttons":       []
            }
        }
    }

    this.addButton = function(button){
        this.content.attachment.payload.buttons.push(button.content);
    }
}

function buttonBlockChat(title,blockName){
    this.content = {
        "type":       "show_block",
        "block_name": blockName,
        "title":      title
    }
}

function redirectChat(blockName) {
    this.content = {
        "redirect_to_blocks": ["number_control", "full_name"]
    }
}


