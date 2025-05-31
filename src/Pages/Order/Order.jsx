import React, { useState } from 'react';
import orderCoverImg from '../../assets/shop/banner2.jpg'
import Cover from '../Shared/Cover';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMedicines from '../../hooks/useMedicines';
import OrderTab from './OrderTab';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Order = () => {
    const categories = ['popular','tablets', 'syrups', 'capsules', 'ointments', 'drinks'];

    const { category } = useParams();
    // console.log(category);
    const initialIndex = categories.indexOf(category);

    const [tabIndex, setTabIndex] = useState(initialIndex);

    const [medicine] = useMedicines();
    const popular = medicine.filter(item=> item.category === 'popular')
    const tablets = medicine.filter(item => item.category === 'tablet')
    const syrups = medicine.filter(item => item.category === 'syrup')
    const capsules = medicine.filter(item => item.category === 'capsule')
    const injections = medicine.filter(item => item.category === 'injection')
    const ointments = medicine.filter(item => item.category === 'ointment')

    return (
        <div>
            <Helmet>
                <title>Medi Nest | Order Medicine</title>
            </Helmet>

            <Cover title={"Order Medicine"} img={orderCoverImg}></Cover>

            <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList>
                    <Tab>Popular</Tab>
                    <Tab>Tablets</Tab>
                    <Tab>Syrups</Tab>
                    <Tab>Capsules</Tab>
                    <Tab>Injections</Tab>
                    <Tab>Ointments</Tab>

                </TabList>
                <TabPanel>
                    <OrderTab items={popular}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={tablets}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={syrups}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={capsules}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={injections}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={ointments}></OrderTab>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Order;