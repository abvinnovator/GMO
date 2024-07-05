import React, { useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Checkbox, Collapse, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { departmentData } from '../modals/Department';

const DepartmentList: React.FC = () => {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const [selected, setSelected] = useState<{ [key: string]: boolean }>({});

  const handleToggle = (department: string) => {
    setExpanded(prev => ({ ...prev, [department]: !prev[department] }));
  };

  const handleSelect = (item: string, isDepartment: boolean) => {
    const newSelected = { ...selected };
    if (isDepartment) {
      const dept = departmentData.find(d => d.department === item);
      if (dept) {
        const isSelected = !selected[item];
        newSelected[item] = isSelected;
        dept.sub_departments.forEach(sub => {
          newSelected[sub] = isSelected;
        });
      }
    } else {
      newSelected[item] = !selected[item];
      const parentDept = departmentData.find(d => d.sub_departments.includes(item));
      if (parentDept) {
        newSelected[parentDept.department] = parentDept.sub_departments.every(sub => newSelected[sub]);
      }
    }
    setSelected(newSelected);
  };

  return (
    <List>
      {departmentData.map((dept) => (
        <React.Fragment key={dept.department}>
          <ListItem>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={selected[dept.department] || false}
                onChange={() => handleSelect(dept.department, true)}
              />
            </ListItemIcon>
            <ListItemText 
              primary={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {dept.department}
                  <IconButton
                    size="small"
                    onClick={() => handleToggle(dept.department)}
                    style={{ marginLeft: '8px' }}
                  >
                    {expanded[dept.department] ? <ExpandMoreIcon /> : <ChevronRightIcon />}
                  </IconButton>
                </div>
              }
            />
          </ListItem>
          <Collapse in={expanded[dept.department]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {dept.sub_departments.map((subDept) => (
                <ListItem key={subDept} sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={selected[subDept] || false}
                      onChange={() => handleSelect(subDept, false)}
                    />
                  </ListItemIcon>
                  <ListItemText primary={subDept} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      ))}
    </List>
  );
};

export default DepartmentList;