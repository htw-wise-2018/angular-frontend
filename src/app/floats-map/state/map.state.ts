import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  HideMarkersLayer,
  HideSaltinessLayer,
  ShowMarkersLayer,
  ShowSaltinessLayer,
  ToggleMarkersLayer,
  ToggleSaltinessLayer
} from './map.actions';

export class MapStateModel {
  public saltinessLayer: boolean;
  public markersLayer: boolean;
}

@State<MapStateModel>({
  name: 'map',
  defaults: {
    saltinessLayer: false,
    markersLayer: true
  }
})
export class MapState {
  @Selector()
  static saltinessLayer(state: MapStateModel) {
    return state.saltinessLayer;
  }

  @Selector()
  static markersLayer(state: MapStateModel) {
    return state.markersLayer;
  }

  @Action(ShowSaltinessLayer)
  showSaltinessLayer(ctx: StateContext<MapStateModel>, action: ShowSaltinessLayer) {
    ctx.patchState({ saltinessLayer: true });
  }

  @Action(HideSaltinessLayer)
  hideSaltinessLayer(ctx: StateContext<MapStateModel>, action: HideSaltinessLayer) {
    ctx.patchState({ saltinessLayer: false });
  }

  @Action(ToggleSaltinessLayer)
  toggleSaltinessLayer(ctx: StateContext<MapStateModel>, action: ToggleSaltinessLayer) {
    const state = ctx.getState();
    ctx.patchState({ saltinessLayer: !state.saltinessLayer });
  }

  @Action(ShowMarkersLayer)
  showMarkersLayer(ctx: StateContext<MapStateModel>, action: ShowMarkersLayer) {
    ctx.patchState({ markersLayer: true });
  }

  @Action(ShowMarkersLayer)
  hideMarkersLayer(ctx: StateContext<MapStateModel>, action: HideMarkersLayer) {
    ctx.patchState({ markersLayer: false });
  }

  @Action(ToggleMarkersLayer)
  toggleMarkersLayer(ctx: StateContext<MapStateModel>, action: ToggleMarkersLayer) {
    const state = ctx.getState();
    ctx.patchState({ markersLayer: !state.markersLayer });
  }
}
