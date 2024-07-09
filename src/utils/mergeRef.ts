export const mergeRef = <T extends unknown>(...refs: React.Ref<T>[]) => {
  return (node: T) => {
    refs.forEach(ref => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref && typeof ref === 'object') {
        (ref as React.MutableRefObject<T | null>).current = node;
      }
    });
  };
};
