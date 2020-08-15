class Token {
	name; lexeme;

    constructor(name, lexeme) {
		this.name = name;
		this.lexeme = lexeme;
	}
}

var languages = {
    trifle: {
        patterns: [
            ["wspace", /^\s+/],
            ["boolean", /^(true|false|null)/],
            ["function", /^([a-zA-Z_]\w*)[\s]*(?=\()/],
            ["keyword", /^(func|class|enum|on|define|fire|while|if|else|elseif|for|in|returns|void|array|return|export|use|except|static|const|public|private|object|string|int|float|number|throw|new)/],
            ["iden", /^([a-zA-Z_]\w*)/],
            ["number", /^(-?\d+\.\d+|-?\d+)/],
            ["string", /^("(\\\\|\\"|[^"])*"|'(\\\\|\\'|[^"])*')/],
            ["comment", /^(\/\/.*|\/\*(\*(?!\/)|[^*])*\*\/)/],
            ["other", /^[\s\S]/]
        ]
    },
    tri: 'trifle'
};

// finds the next token in the input string, starting at input[i], using the given token patterns.
// returns a token object and the index that the token ends.
function read_token(patterns, input, i) {
	for (var j = 0; j < patterns.length; j++) {
		var regex = patterns[j][1];
		var result = input.slice(i).match(regex);
		if (result !== null) {
			var text = result[0];
			var token = [patterns[j][0], text];
			return [token, i + text.length];
		}
	}
}

// takes an input string and a list of token patterns and tokenizes the string.
// returns a list of tokens.
function lexer(patterns, input) {
	var tokens = [];
	for (var i = 0; i < input.length;) {
		var token = read_token(patterns, input, i);
		i = token[1];
		tokens.push(token);
	}

	return tokens.filter(val => {
		return true;
	}).map(tok => {
		return new Token(tok[0][0], tok[0][1]);
	});
}

function escapeHtml(text) {
    var map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

module.exports = function highlight(str, lang) {
    let outputStr = '';
    if (languages[lang] !== undefined) {
        var finalLang = languages[lang]
        if (typeof finalLang === 'string') {
            finalLang = languages[finalLang];
        }
        var toks = lexer(finalLang.patterns, str);

        for (var i = 0; i < toks.length; i++) {
            if (toks[i].name == 'wspace') {
                outputStr += toks[i].lexeme.replace('\\n', '\n');
            } else if (toks[i].name == 'other') {
                outputStr += `<span>${escapeHtml(toks[i].lexeme)}</span>`;
            } else {
                outputStr += `<span class="${toks[i].name}">${escapeHtml(toks[i].lexeme)}</span>`;
            }
        }
    } else {
        return '';
    }
    return outputStr;
}