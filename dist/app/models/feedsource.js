"use strict";
class FeedSource {
    constructor(name, sourceUrl, url, id) {
        this.name = name;
        this.sourceUrl = sourceUrl;
        this.url = url;
        this.id = id;
        this.active = false;
    }
}
exports.FeedSource = FeedSource;
