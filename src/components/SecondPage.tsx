// src/components/SecondPage.tsx
import React, { useEffect, useState } from 'react';
import { Typography, Container, Box, Button } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Post } from '../modals/Post';
import DepartmentList from './DepartmentList';

const SecondPage: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userDetails');
    navigate('/', { replace: true });
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'userId', headerName: 'User ID', width: 100 },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'body', headerName: 'Body', width: 500 },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome<span> {userDetails.name}!</span>
        </Typography>
       
        <Button
          onClick={handleLogout}
          variant="contained"
          sx={{ mt: 2, mb: 4 }}
          color='error'
        >
          Logout
        </Button>
        <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2 }}>
          Departments
        </Typography>
        <DepartmentList />
        <Typography variant="h5" component="h2" gutterBottom>
          Posts
        </Typography>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={posts}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
        disableRowSelectionOnClick
            loading={loading}
          />
        </div>
       
      </Box>
    </Container>
  );
};

export default SecondPage;