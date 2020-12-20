import React from 'react';
import './Pages.css';
import { Accordion, AccordionTab } from 'primereact/accordion';
import YrlTransactions from './YrlTransactions';
import BusinessSector from './BusinessSector';
import TxnDemography from './TxnDemography';

function Page4(props) {
    return (
        <div className='page4'>
            <div className="datatable-scroll-demo" scrollable scrollHeight="200px" style={{ width: '1190px' }}>
                        <Accordion activeIndex={0} multiple="true" >
                                <AccordionTab header="Yearly Transaction View">
                                  <YrlTransactions/>
                                </AccordionTab>
                                <AccordionTab header="Business Sector View">
                                   <BusinessSector/>
                                </AccordionTab>
                                <Accordion header = "Business Transaction Demogaphy View">
                                  <TxnDemography/>
                                </Accordion>
                        </Accordion>                      
            </div>
       </div> 
    );
}

export default Page4;