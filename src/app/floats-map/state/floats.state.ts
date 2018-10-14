import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Float } from '../models/float.model';
import { AddFloat, AddFloats } from './floats.actions';

export class FloatsStateModel {
  public items: Float[];
}

@State<FloatsStateModel>({
  name: 'floats',
  defaults: {
    items: []
  }
})
export class FloatsState {
  @Selector()
  static floats(state: FloatsStateModel) {
    return state.items;
  }

  @Action(AddFloat)
  addOne(ctx: StateContext<FloatsStateModel>, action: AddFloat) {
    const state = ctx.getState();
    ctx.setState({ items: [...state.items, action.payload] });
  }

  @Action(AddFloats)
  addMany(ctx: StateContext<FloatsStateModel>, action: AddFloats) {
    const state = ctx.getState();
    ctx.setState({ items: [...action.payload] });
  }
}
