// src\types\eslintrc.d.ts
declare module '@eslint/eslintrc' {
  import type { Linter } from 'eslint';

  export class FlatCompat {
    constructor(options: { baseDirectory: string });
    extends(...configs: string[]): Linter.Config[];
    plugins(...configs: string[]): Linter.Config[];
    config(config: Linter.Config): Linter.Config[];
  }
}
