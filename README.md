# sassunit
Unit testing framework for Dart Sass

## Installation

```
$ npm install @gyugyu/sassunit @gyugyu/assert-sass sass
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

```
$ npx sassunit
```
