import { createAction,props } from "@ngrx/store";

export const initAction = createAction('init App');

export  const changeUsername = createAction('Change username', props<{username: string}>())