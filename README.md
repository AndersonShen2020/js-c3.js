# 使用套件

- axios
- c3.js

## c3.js

```html
<div id="chart"></div>
```

```js
let chart = c3.generate({
    bindto: '#chart', // 對應 html的 id=chart DOM 元素
    data: {           
      columns: [      // 存放資料的地方
        ['高雄', 2],
        ['台中', 1],
        ['台北',1]
      ],
      type: "donut", // 圖表種類
      colors: {      // 圖表用顏色
        高雄: "#E68618",
        台中: "#5151D3",
        台北: "#26BFC7",
      },
    },
    size: {          // 圖表大小
      width: 160,
      height: 160,
    },
    donut: {
      title: "套票地區比重", // 中間標題
      width: 8,             // 邊框大小
      label: {              // 隱藏邊框百分比
        show: false,
      },
    },
});
```
