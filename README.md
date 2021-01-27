# sassunit
Unit testing framework for Dart Sass

## Installation

```bash
npm install @gyugyu/sassunit @gyugyu/assert-sass sass
```

## Example

```scss
@function sum($a, $b) {
  @return $a + $b;
}
```

```scss
@use 'functions';
@use '@gyugyu/assert-sass' as assert;

@function test-sum() {
  $ret: assert.equals(functions.sum(2, 3), 5);
  @return $ret;
}
```

```bash
npx sassunit
```

## Watch mode

From v0.2.0, watch mode is added.

```bash
npx sassunit src --watch
```
