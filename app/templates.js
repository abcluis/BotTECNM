/**
 * Created by usuario1 on 6/21/2017.
 */

module.exports = {
    bodyChat:        bodyChat,
    textChat:        textChat,
    cardChat:        cardChat,
    buttonBlockChat: buttonBlockChat,
    redirectChat:    redirectChat,
    quickChat:       quickChat
};


function bodyChat() {

    this.add = function (text) {
        if(this.content.messages[0]){
            this.content.messages[0].text = text.content;
        }else {
            this.content.messages.push(text.content);
        }

    };

    this.addRedirect = function (redirect) {
        this.content.redirect_to_blocks = redirect;
    };

    this.addQuick = function (quick) {
        if(!this.content.messages[0]){
            this.content.messages[0] = {};
        }
        if(!this.content.messages[0].quick_replies){
            this.content.messages[0].quick_replies = [];
        }
        this.content.messages[0].quick_replies.push(quick.content);
    };

    this.content = {
        "messages": []
    };
}


function textChat(text) {
    this.content = {
        "text": text
    }
}

function cardChat(text) {
    this.content = {
        "attachment": {
            "type":    "template",
            "payload": {
                "template_type": "button",
                "text":          text,
                "buttons":       []
            }
        }
    };

    this.addButton = function (button) {
        this.content.attachment.payload.buttons.push(button.content);
    }
}

function buttonBlockChat(title, blockName) {
    this.content = {
        "type":       "show_block",
        "block_name": blockName,
        "title":      title
    }
}

function redirectChat(block) {
    this.content = {
        "redirect_to_blocks": [block]
    }
}

function quickChat(title, url) {
    this.content = {
        "title": title,
        "url":   url,
        "type":  "json_plugin_url"
    }
}


