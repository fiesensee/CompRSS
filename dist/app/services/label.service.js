"use strict";
const Subject_1 = require('rxjs/Subject');
class LabelService {
    constructor() {
        this.labelSource = new Subject_1.Subject();
        this.label$ = this.labelSource.asObservable();
    }
    setActiveLabel(label) {
        this.labelSource.next(label);
    }
}
exports.LabelService = LabelService;
