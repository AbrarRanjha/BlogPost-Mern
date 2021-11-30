import React from 'react'

import { Button, Table, TableHead, TableRow, TableCell, TableBody, makeStyles, Grid } from '@material-ui/core';
import {Link} from 'react-router-dom'
import { categories } from '../constants/data';

const useStyle = makeStyles({
    table: {
        border: '1px solid rgba(224, 224, 224, 1)'
    },
    write: {
        margin: 20,
        background: '#6495ED',
        width:'86%',
        color: '#fff',
        textDecoration: 'none'
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    }
})




const Categories = () => {
    const classes=useStyle();
    return (
        <>
             <Button component={Link} to="/create" variant="contained" className={classes.write}>Create Blog</Button>


             <Table className={classes.table}>
                <TableHead>
                <TableCell>
                        <Link to={"/"} className={classes.link}>
                            All Categories
                        </Link>
                    </TableCell>
                </TableHead>
                <TableBody>
                   {categories.map(category=>(
                       <TableRow>
                          <TableCell>
                                    <Link to={`/?category=${category}`} className={classes.link}>
                                        {category}
                                    </Link>
                                </TableCell>
                           </TableRow>
                   ))}
                </TableBody>
            </Table>
        </>
    )
}

export default Categories
