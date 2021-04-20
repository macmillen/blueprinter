export const css = (
  predicate: boolean,
  classes: string,
  elseClasses?: string
): string => {
  return predicate ? classes : elseClasses ?? "";
};

export const getClasses = (classes: string): string => {
  return classes.replaceAll(" ", "").replaceAll("\n", " ").trim();
};
