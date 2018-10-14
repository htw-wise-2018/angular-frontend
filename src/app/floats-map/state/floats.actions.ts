import { Float } from '../models/float.model';

export class AddFloat {
  static readonly type = '[Floats] Add item';

  constructor(public payload: Float) {
  }
}

export class AddFloats {
  static readonly type = '[Floats] Add items';

  constructor(public payload: Float[]) {

  }
}
