# UIButton
按钮，搭配ripple效果。视觉规范参考[Google Material Design](https://material.google.com/components/buttons.html)

## 按钮类型
1. Flat (扁平) `ui-button`
2. Raised (浮动) `ui-button raised`

## 按钮主题
1. Flat 按钮统一没有背景色，颜色对应字体颜色
2. Raised 颜色对应背景色

色值：
```scss
  $color-map: (
    primary: $brand,
    green: #4caf50,
    red: #f44336,
    blue: #2196f3,
    yellow: #ffeb3b,
    orange: #ff9800,
    brown: #795548,
    purple: #9c27b0,
    pink: #e91e63
  ) !default;
```

## Example
Flat:
```html
  <button ui-button>FLAT</button>
  <button ui-button color="primary">主色</button>
  <button ui-button color="green">绿色</button>
  <button ui-button color="red">红色</button>
  <button ui-button disabled>禁用</button>
```

Raised:
```html
  <button ui-button raised>RAISED</button>
  <button ui-button raised color="primary">主色</button>
  <button ui-button raised color="green">绿色</button>
  <button ui-button raised color="red">红色</button>
  <button ui-button raised color="orange" rippleDisabled="true">无Ripple</button>
  <button ui-button raised color="primary" [disabled]="true">禁用</button>
```

## API
Properties:

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| `color` | string | `'primary', 'green', ...` 按钮颜色，对应上方scss | `''` |
| `disabled` | boolean | 是否禁用按钮 | `false` |
| `disableRipple` | boolean | 是否禁用按钮ripple效果 | `false` |

## TODO
1. 按钮大小
2. 组合按钮 (!MD)
3. 块状按钮 
4. 图标按钮
5. 线框按钮 (!MD)
6. FAB按钮
7. 圆角按钮 (!MD)
