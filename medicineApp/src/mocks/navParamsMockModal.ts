export class NavParamsMockModal {
    root: any;

    constructor() {

    }

    get(subject: string) {
        this.root = {};
        this.root.getTitle = function () {
            return "Ibuprofen";
        }
        this.root.isLeaveReview = function() {
            return true;
        }
        this.root.submitted = function() {
            
        }
        return this.root;
    }
}