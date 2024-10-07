import DOMPurify from 'dompurify';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import parse from 'html-react-parser';
import 'react-quill/dist/quill.snow.css';
import { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

import List from '@mui/material/List';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import ListItem from '@mui/material/ListItem';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import CircularProgress from '@mui/material/CircularProgress';

import { addFac, getFacs, updateFac, deleteFac } from 'src/lib/api/fac';

// Add this custom styled component for the Quill editor
const StyledQuill = styled(ReactQuill)({
  '& .ql-container': {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  '& .ql-toolbar': {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
});

const CustomButton = styled(Button)({
  borderRadius: 8, // Rounded button corners
  backgroundColor: '#7b61ff', // Purple button background
  textTransform: 'none', // Normal case for button text
  fontSize: '16px',
  padding: '12px 16px',
  '&:hover': {
    backgroundColor: '#6a50ff', // Slightly darker purple on hover
  },
});

// Add this custom component to render sanitized HTML
const SanitizedHTML = ({ html }) => {
  const sanitizedHTML = DOMPurify.sanitize(html);
  return <>{parse(sanitizedHTML)}</>;
};

SanitizedHTML.propTypes = {
  html: PropTypes.string.isRequired,
};

export default function FacView() {
  const [facs, setFacs] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    fetchFacs();
  }, []);

  const fetchFacs = async () => {
    try {
      // Replace with actual API call to get FACs
      const response = await getFacs();
      setFacs(response);
    } catch (error) {
      console.error('Failed to fetch FACs:', error);
      setSnackbarSeverity('error');
      setSnackbarMessage('Failed to fetch FACs.');
      setSnackbarOpen(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      const data = { title, content: content.trim() };
      let response;
      if (editing) {
        // Edit existing FAC
        response = await updateFac(editingId, data);
      } else {
        // Add new FAC
        response = await addFac(data);
      }

      if (response.status === 200) {
        setSnackbarSeverity('success');
        setSnackbarMessage(editingId ? 'FAC updated successfully.' : 'FAC added successfully.');
        fetchFacs();
        resetForm();
      } else {
        throw new Error('Failed to save FAC');
      }
    } catch (error) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Failed to save FAC.');
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
    }
  };

  const handleEdit = (fac) => {
    setEditing(true);
    setEditingId(fac._id);
    setTitle(fac.title);
    setContent(fac.content);
  };

  const handleDelete = async (id) => {
    try {
      await deleteFac(id);
      setSnackbarSeverity('success');
      setSnackbarMessage('FAC deleted successfully.');
      fetchFacs();
    } catch (error) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Failed to delete FAC.');
    }
    setSnackbarOpen(true);
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setEditingId(null);
    setEditing(false);
  };
  // Handle closing of the snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container sx={{ marginTop: 5 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Manage FAQs
      </Typography>
      <Grid container spacing={4}>
        {/* Form for adding/editing FACs */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {editing ? 'Edit FAQ' : 'Add New FAQ'}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  variant="outlined"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <StyledQuill
                  value={content}
                  onChange={setContent}
                  placeholder="Enter content here..."
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, false] }],
                      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                      [{ list: 'ordered' }, { list: 'bullet' }],
                      ['link', 'image'],
                      ['clean'],
                    ],
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomButton type="submit" variant="contained" fullWidth disabled={loading}>
                  {loading && <CircularProgress size={24} sx={{ color: '#fff', mr: 1 }} />}
                  {editing ? 'Update' : 'Add'}
                </CustomButton>
              </Grid>
            </Grid>
          </form>
        </Grid>

        {/* List of existing FACs */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Existing FAQs
          </Typography>
          <List>
            {facs.map((fac) => (
              <ListItem
                key={fac.id}
                secondaryAction={
                  <>
                    <IconButton edge="end" aria-label="edit" mx={2} onClick={() => handleEdit(fac)}>
                      <FaEdit />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      mx={2}
                      onClick={() => handleDelete(fac._id)}
                    >
                      <FaTrash />
                    </IconButton>
                  </>
                }
              >
                <ListItemText
                  primary={fac.title}
                  secondary={<SanitizedHTML html={fac.content} />}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={8000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
