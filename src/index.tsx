import React from 'react';
import ReactDOM from 'react-dom';
// import '../lib/styles.css'
// import { MockFormLazy, MockFormLazyLdfield } from '../__tests__/mocks';
import Input from '@ldfields/default-react';
import { useState } from '@jeswr/use-state';
import { namedNode } from '@rdfjs/data-model';
import { Data } from '@ldfields/props-rdf-conversion/types';

function App() {
  const [props, setData] = useState<Data>({
    term: namedNode('http://example.org#Jesse'),
    annotations: [],
  })
  return <Input
    props={props}
    onChange={e => {
      console.log('on change triggered with value', e)
      setData(e);
    }}
    constraints={{}}
  />
}

ReactDOM.render(
  <div id="app">
    <App />
  </div>,
  document.getElementById('app'),
);
