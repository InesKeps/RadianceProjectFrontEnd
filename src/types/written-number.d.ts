declare module "written-number" {
  interface Options {
    lang?: string;
    noAnd?: boolean;
  }

  function writtenNumber(value: number, options?: Options): string;

  export default writtenNumber;
}
