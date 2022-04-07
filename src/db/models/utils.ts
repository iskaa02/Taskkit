import { Collection, Model, Query } from "@nozbe/watermelondb";
import withObservable from "@nozbe/with-observables";
import React from "react";
import { Observable } from "rxjs";
export function uid() {
  return (performance.now().toString(14) + Math.random().toString(14)).replace(
    /\./g,
    ""
  );
}

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

type Observed<A> = A extends Model[]
  ? Query<ArrayElement<A>> | Collection<ArrayElement<A>>
  : A extends Model
  ? A | Observable<A> | any
  : never;
type ObservedObject<T> = {
  [A in keyof T]: Observed<T[A]>;
};

//@ts-ignore
type Optional<T, K extends keyof any> = Pick<Partial<T>, K> & Omit<T, K>;

export function withDB<InputProps, ObservableProps>(
  component: React.ComponentType<InputProps>,
  triggerProps: Array<keyof InputProps>,
  getObservables: (props: InputProps) => ObservedObject<ObservableProps>
): React.FC<Optional<InputProps, keyof ObservableProps>> {
  const A: React.FC<Optional<InputProps, keyof ObservableProps>> =
    withObservable<InputProps, ObservableProps>(
      triggerProps,

      //@ts-ignore
      getObservables
    )(
      //@ts-ignore
      component
    );
  return A;

  // export default function withObservables<InputProps, ObservableProps>(
  //   triggerProps: Array<keyof InputProps>,
  //   getObservables: (props: InputProps) => ObservableProps
  // ): InferableComponentEnhancer<ExtractedObservables<ObservableProps>, InputProps>
}
