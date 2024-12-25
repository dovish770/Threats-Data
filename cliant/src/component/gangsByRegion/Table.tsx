import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { gangsByRegion } from '../../types/serverTypes';

interface GangsTableProps {
  data: gangsByRegion[];
}

const GangsTable: React.FC<GangsTableProps> = ({ data }) => {
  return (
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
            <TableCell>Gang</TableCell>
            <TableCell>Casualties</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((gang, index) => (
            <TableRow key={index}>
              <TableCell>{gang.gang}</TableCell>
              <TableCell>{gang.casualties}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GangsTable;
