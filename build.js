var fs = require('fs'),
    path = require('path'),
    glob = require('glob'),
    markdown = new require('markdown-it')({
        highlight: require('./syntax'),
        html: true,
        breaks: true,
    }),
    prettify = require('html-prettify'),
    pdf = require('html-pdf');

function mkpath(...p) {
    return path.join(__dirname, ...p);
}

if (!fs.existsSync(mkpath('docs'))) {
    fs.mkdirSync(mkpath('docs'));
}

if (!fs.existsSync(mkpath('src'))) {
    throw new (class SpecError extends Error {})(`Source path doesn't exist.`);
}

var template = fs.readFileSync('./src/template.html').toString();
var files = glob.sync('src/*.md');

files.forEach(file => {
    var body = markdown.render(fs.readFileSync(mkpath(file)).toString());
    var data = template.replace(/{{body}}/g, body);
    fs.writeFileSync(mkpath('docs', path.basename(file.slice(4), '.md') + '.html'), data);

    pdf.create(data, { format: 'Letter' }).toFile(mkpath('docs', path.basename(file.slice(4), '.md') + '.pdf'), function(err, res) {
        if (err) return console.log(err);
    });
});