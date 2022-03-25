function uid() {
  return (performance.now().toString(14) + Math.random().toString(14)).replace(
    /\./g,
    ""
  );
}
