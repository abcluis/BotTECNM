module.exports = {

    generic: generic,
    card:    card,
    list:    list,
    quick:   quick

};

function generic() {

    let content = {};

    return {
        addText:     function (text) {
            if (!content.messages) {
                content.messages = [];
            }
            content.messages.push({
                "text": text
            });
            return this;
        },
        addRedirect: function (block) {
            if (!content.redirect_to_blocks) {
                content.redirect_to_blocks = [];
            }
            content.redirect_to_blocks.push(block);
            return this;
        },
        get:         function () {
            return content;
        }
    }
}

function card() {
    let content        = {};
    let currentMessage = -1;

    return {
        addText:   function (text) {
            if (!content.messages) {
                content.messages = [];
            }
            content.messages.push({
                "text": text
            });
            currentMessage++;
            return this;
        },
        addCard:   function (title) {
            if (!content.messages) {
                content.messages = [];
            }
            content.messages.push({
                "attachment": {
                    "payload": {
                        "buttons":       [],
                        "template_type": "button",
                        "text":          title
                    },
                    "type":    "template"
                }
            });
            currentMessage++;
            return this;
        },
        addButton: function (title, block) {
            content.messages[currentMessage].attachment.payload.buttons.push({
                "block_name": block,
                "title":      title,
                "type":       "show_block"
            });
            return this;
        },
        get:       function () {
            return content;
        }
    }
}

function list() {
    let content        = {};
    let currentMessage = -1;

    return {
        addList:    function () {
            if (!content.messages) {
                content.messages = [];
            }
            content.messages.push({
                "attachment": {
                    "type":    "template",
                    "payload": {
                        "template_type":     "list",
                        "top_element_style": "large",
                        "elements":          []
                    }
                }
            });
            currentMessage++;
            return this;
        },
        addElement: function (name, url) {
            content.messages[currentMessage].attachment.payload.elements.push({
                "title":     name,
                "image_url": "http://www.itmatamoros.edu.mx/wp-content/uploads/2017/05/Logo-TecNM-2017-Ganador.png",
                "buttons":   [
                    {
                        "type":  "json_plugin_url",
                        "url":   url,
                        "title": "Elegir"
                    }
                ]
            });

            return this;
        },
        get:        function () {
            return content;
        }
    }
}

function quick() {

    let content        = {};
    let currentMessage = -1;

    return {
        addText:  function (text) {
            if (!content.messages) {
                content.messages = [];
            }
            content.messages.push({
                "text": text
            });
            currentMessage++;
            return this;
        },
        addQuick: function (title, url) {
            if (!content.messages) {
                content.messages = [];
            }
            if (!content.messages[content.messages.length - 1].quick_replies) {
                content.messages[content.messages.length - 1].quick_replies = [];
            }
            content.messages[content.messages.length - 1].quick_replies.push({
                "title": title,
                "url":   url,
                "type":  "json_plugin_url"
            });
            return this;
        },
        get:      function () {
            return content;
        }
    }

}

