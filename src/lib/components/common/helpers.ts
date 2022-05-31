// export type PickMap<Set extends string, Subset extends Set> = Pick<
//   { [key in Set]: string },
//   Subset
// >;

export type MappedSet<Set extends string, T = string> = {
  [key in Set]: T;
};
