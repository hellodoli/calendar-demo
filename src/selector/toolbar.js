import { createSelector } from "reselect";

const toolbarSelector = (state) => state.toolbar;

export const selectView = createSelector(
  toolbarSelector,
  (toolbar) => toolbar.view
);

export const selectTitleView = createSelector(
  toolbarSelector,
  (toolbar) => toolbar.view.title
);
