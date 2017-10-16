export class UpdateObject {
  private _query: Object;
  private _update: Object;
  protected _id: string;

  constructor(query: string | Object, update: Object) {
    this.query = query;
    this.update = update;
  };

  set query(query: string | Object) {
		if(typeof query === 'string'){
		  this._id = query;
    } else {
		  this._query = query;
    }
  }

  get query() {
    return this._query;
  }

  set update(update: any) {
    this._update = {$set: update};

    if (update.hasOwnProperty("$push")) this._update = update;
  }

  get update() {
    return this._update;
  }

  get id(){
    return this._id;
  }
}