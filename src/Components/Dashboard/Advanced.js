import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import Table from "./Table";

const Advanced = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchDataFromLocalStorage = () => {
            const localStorageKeys = Object.keys(localStorage);
            let newData = [];

            localStorageKeys.forEach((key) => {
                if (key.startsWith('formData')) {
                    const storedData = localStorage.getItem(key);
                    if (storedData) {
                        const parsedData = JSON.parse(storedData);
                        if (Array.isArray(parsedData)) {
                            newData = [...newData, ...parsedData];
                        }
                    }
                }
            });

            setData(newData);
        };

        fetchDataFromLocalStorage();
    }, []);

    const columns = [
        {
            Header: "ID",
            accessor: "id",
            sort: true,
        },
        {
            Header: "Name",
            accessor: "name",
            sort: true,
        },
        {
            Header: "Phone Number",
            accessor: "phonenumber",
            sort: false,
        },
        {
            Header: "Age",
            accessor: "age",
            sort: true,
        },
        {
            Header: "Company",
            accessor: "company",
            sort: false,
        },
    ];

    const sizePerPageList = [
        { text: "5", value: 5 },
        { text: "10", value: 10 },
        { text: "25", value: 25 },
        { text: "All", value: data.length },
    ];

    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <h4 className="header-title">Search</h4>
                            <p className="text-muted fs-14 mb-4">A Table allowing search</p>
                            <Table
                                columns={columns}
                                data={data}
                                pageSize={5}
                                sizePerPageList={sizePerPageList}
                                isSortable={true}
                                pagination={true}
                                isSearchable={true}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default Advanced;
