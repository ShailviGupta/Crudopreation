import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Input, Table } from 'semantic-ui-react';

const Home = () => {
    const [APIData, setAPTData] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    const setData = (data) => {
        let { id, username, email, address } = data;
        localStorage.setItem("ID", id);
        localStorage.setItem("Email", email);
        localStorage.setItem("username", username);
        localStorage.setItem("address", address);
    };

    const onDelete = (id) => {
        axios.delete(`http://localhost:4000/users/${id}`).then(() => { getData() })

    }
    const getData = () => {
        axios.get(`http://localhost:4000/users`).then((res) => {
            setAPTData(res.data)
        })
    }

    useEffect(() => {
        axios.get("http://localhost:4000/users").then((res) => {
            setAPTData(res.data)


        }

        )
    }, [])
    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = APIData.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else {
            setFilteredResults(APIData)
        }
    }
    return (
        <div>
            <div>
                <Input icon='search'
                    placeholder='Search...'
                    onChange={(e) => searchItems(e.target.value)}
                />
            </div>
            <div>
                <Link to="/create">
                    <Button type='submit'>Add user</Button>
                </Link>
            </div>
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>USERNAME</Table.HeaderCell>
                        <Table.HeaderCell>EMAIL</Table.HeaderCell>
                        <Table.HeaderCell>ADDRESS</Table.HeaderCell>
                        <Table.HeaderCell className=" ui center aligned">Actions</Table.HeaderCell>

                    </Table.Row>
                </Table.Header>
                {searchInput.length > 1 ? (
                    filteredResults.map((data, id) => {
                        return (
                            <Table.Row key={id}>
                                <Table.Cell>{data.id}</Table.Cell>
                                <Table.Cell>{data.username}</Table.Cell>
                                <Table.Cell>{data.email}</Table.Cell>
                                <Table.Cell>{data.address}</Table.Cell>
                                <Table.Cell>
                                    <Button onClick={() => (onDelete(data.id))}>Delete</Button>
                                    < Link to={`/update/:${id}`}>
                                        <Button onClick={() => setData(data)}>Update</Button>
                                    </Link>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })
                ) : (APIData.map((data, id) => {
                    return (
                        <Table.Row key={id}>
                            <Table.Cell>{data.id}</Table.Cell>
                            <Table.Cell>{data.username}</Table.Cell>
                            <Table.Cell>{data.email}</Table.Cell>
                            <Table.Cell>{data.address}</Table.Cell>
                            <Table.Cell>
                                <Button onClick={() => (onDelete(data.id))}>Delete</Button>
                                < Link to={`/update/:${id}`}>
                                    <Button onClick={() => setData(data)}>Update</Button>
                                </Link>
                            </Table.Cell>
                        </Table.Row>
                    )
                }))}
            </Table>
        </div>
    )
}

export default Home