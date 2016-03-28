var SearchQuery = function (query, pos) {
    this.query = query || '';
    this.pos = pos || 0;
}

var Page = function (relativePath) {
    this.relativPath = relativePath || '';
    this.queryes = [];
}

Page.prototype.addQuery = function(q) {
    console.assert(q instanceof SearchQuery, "query is not SearchQuery class");
    this.queryes.unshift(q);
    return this;
}

var Competitor = function (host) {
    this.host = host;
    this.hitsCount = 0;
    this.pages = [];
}

Competitor.prototype.addPage = function(p) {
    console.assert(p instanceof Page, "page is not Page class");
    this.pages.unshift(p);
    return this;
}
