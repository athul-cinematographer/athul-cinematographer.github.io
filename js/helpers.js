
function getRelativeTemplate(relativePath, importMetaUrl) {
    return new URL(relativePath+".html", importMetaUrl).pathname;
}


function getTemplateAy(importMetaUrl) {
    return new URL("index.html", importMetaUrl).pathname;
}

