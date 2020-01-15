type T = 'a' | 'b';

export default function () {
  import('./foo').then(({ default: foo }) => console.log(foo));
}
