import {BasicManager} from "../BasicManager";
import {Model} from "../model/Report";

export class Joke extends BasicManager {
    wire_custom_listeners() {}

    get model() {
        return Model;
    }

    get event_name() {
        return 'report';
    }
}