import React, { FunctionComponent, useEffect } from 'react'
import Beamer from '../views/Beamer/Beamer';
import html2canvas from 'html2canvas';

const LiveView: FunctionComponent = (props) => {

  useEffect(() => {
    const node: HTMLElement | null = document.querySelector('#beamer');
    if(node) {
      html2canvas(node, {
        useCORS: true,
        allowTaint: true,
        logging: true,
        taintTest: true,
      })
      .then((canvas) => {
        if(document.querySelector('#view')?.innerHTML === '') {
          document.querySelector('#view')?.appendChild(canvas);
        }
        node.style.visibility = 'hidden';
      })
    }
  });

  return (
    <div>
      <Beamer />
      <div id='view'></div>
    </div>
  );
};

export default LiveView;