# sassunit
Unit testing framework for Dart Sass

## Idea

```scss
@function sum($a, $b) {
  @return $a + $b;
}
```

```scss
@use 'functions';
@use '@gyugyu/assert-sass' as assert;

@function test-sum() {
  $ret: assert.assert-equal(functions.sum(2, 3), 5);
  @return $ret;
}
```
