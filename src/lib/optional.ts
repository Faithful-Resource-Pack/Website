type Optional<T> = {
  value: T | null,
  chain: <R>(predicate: (val: NonNullable<T>) => R) => Optional<R | null>,
  unwrap: () => T | null,
}

const CreateOptional = function<T>(val: T | null): Optional<T> {
    return {
      value: val,
      chain: function(predicate)  {
        if (this.value) return CreateOptional(predicate(this.value))
        return CreateOptional(null)
      },
      unwrap: function() {
        if(this.value) return this.value;
        throw new Error(`Falsy unwrap() on ${this.value}`)
      }
    }
}

export default CreateOptional;
export { CreateOptional, type Optional };
