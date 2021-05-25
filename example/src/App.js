import React from 'react';

import { MonthPicker } from 'react-month-picker-tis';
import 'react-month-picker-tis/dist/index.css';

const App = () => {
  return (
    <div className='App'>
      <div className='Title'>
        MonthPicker Tis
      </div>
      <MonthPicker
        className='MonthPicker'
        // initialRange={{ start: { year: 2021, month: 1 }, end: { year: 2021, month: 6 } }}
        onChange={selectedRange => console.log(selectedRange)}
        darkMode={false}
      />
    </div>
  );
};

export default App;
