import React from 'react';
import './Pages.css';
import ChartViewer from './ChartViewer';
import ChartMulti from './ChartMulti';
import StockChart from './StockChart';
import { Accordion, AccordionTab } from 'primereact/accordion';

function Page2(props) {
    return (
        <div className='page2'>
            <div className="datatable-scroll-demo" scrollable scrollHeight="200px" style={{ width: '1190px' }}>
                 <Accordion activeIndex={0} multiple="true" >
                        <AccordionTab header="Forex High Low Indicator">
                             <ChartMulti/>
                        </AccordionTab>
                        <AccordionTab header="Stock High Low Indicator">
                             <StockChart/>
                        </AccordionTab>
                 </Accordion>                      
            </div>
        </div>
    );
}

export default Page2;