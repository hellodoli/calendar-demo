import { createSelector } from "reselect";

const toolbarSelector = (state) => state.toolbar;

export const selectView = createSelector(
  toolbarSelector,
  (toolbar) => toolbar.view
);

export const selectViewType = createSelector(
  toolbarSelector,
  (toolbar) => toolbar.view.type
);

export const selectTitleView = createSelector(
  toolbarSelector,
  (toolbar) => toolbar.view.title
);
