import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { IncidentsByYearOrGang } from '../../types/serverTypes';

interface IncidentsTableProps {
  data: IncidentsByYearOrGang[];
}

const IncidentsTable: React.FC<IncidentsTableProps> = ({ data }) => {
  return (
    <>
    <TableContainer 
      component={Paper} 
      sx={{ 
        maxHeight: 400, 
        overflowY: 'auto' 
      }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Incidents</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((name, index) => (
            <TableRow key={index}>
              <TableCell>{name.name}</TableCell>
              <TableCell>{name.incidents}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
         
    </>
  );
};

export default IncidentsTable;
