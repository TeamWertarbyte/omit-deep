// based on https://stackoverflow.com/a/55539616
type Primitive = string | Function | number | boolean | Symbol | undefined | null;
type DeepOmitHelper<T, K extends keyof T> = {
  [P in K]: //extra level of indirection needed to trigger homomorhic behavior
    T[P] extends infer TP ? // distribute over unions
    TP extends Primitive ? TP : // leave primitives and functions alone
    TP extends any[] ? DeepOmitArray<TP, K> : // Array special handling
    DeepOmit<TP, K>
    : never
};
type DeepOmit<T, K> = T extends Primitive ? T : DeepOmitHelper<T, Exclude<keyof T, K>>;

type DeepOmitArray<T extends any[], K> = {
  [P in keyof T]: DeepOmit<T[P], K>;
};

declare function omitDeep<T, K extends string>(
  value: T,
  keys: K | K[]
): DeepOmit<T, K>;

export = omitDeep;
