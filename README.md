# react-month-picker-tis

> Month picker component for React

[![NPM](https://img.shields.io/npm/v/react-month-picker-tis.svg)](https://www.npmjs.com/package/react-month-picker-tis) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

![react-month-picker-tis Banner](https://user-images.githubusercontent.com/76048512/119469702-da2daf00-bd5c-11eb-9bfd-94ca52212501.gif)

## Install

```bash
npm i react-month-picker-tis
```

or

```bash
yarn add react-month-picker-tis
```

## Usage

```jsx
import React from 'react'

import { MonthPicker } from 'react-month-picker-tis'
import 'react-month-picker-tis/dist/index.css'

const App = () => {
  return (
    <MonthPicker
      className='MonthPicker'
      initialRange={{
        start: { year: 2021, month: 0 },
        end: { year: 2021, month: 6 }
      }}
      onChange={(selectedRange) => console.log(selectedRange)}
      darkMode={false}
    />
  )
}

export default App
```

## License

MIT © [boof-tech](https://github.com/boof-tech)
