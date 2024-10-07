import ReactQuill from 'react-quill'; // Add this import
import 'react-quill/dist/quill.snow.css'; // Add this import for Quill styles
import { useState, useEffect } from 'react';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import { getFooter, putFooter } from 'src/lib/api/footer';

// Custom styles for the input fields and button
const CustomTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: 8, // Rounded corners for input fields
    '& fieldset': {
      borderColor: '#ccc',
    },
    '&:hover fieldset': {
      borderColor: '#999',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#6200ea', // Purple border when focused
    },
  },
  '& .MuiInputBase-input': {
    padding: '12px 16px', // Padding inside the input fields
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

export default function FooterView() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const [errors, setErrors] = useState({
    title: '',
    content: '',
  });

  useEffect(() => {
    const getNoti = async () => {
      try {
        const res = await getFooter();
        setTitle(res.title);
        setContent(res.content);
      } catch (error) {
        console.log(error);
      }
    };
    getNoti();
  }, []);

  const validate = () => {
    let isValid = true;
    const newErrors = { title: '', content: '' };

    if (title.trim() === '') {
      newErrors.title = 'Line 1 is required.';
      isValid = false;
    }
    if (content.trim() === '') {
      newErrors.content = 'content is required.';
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validate()) {
      setLoading(true);

      try {
        const data = { title, content };
        const response = await putFooter(data);
        if (response === 500) {
          setSnackbarSeverity('error');
          setSnackbarMessage('Failed to change notification.');
        } else {
          setSnackbarSeverity('success');
          setSnackbarMessage('Notification has been changed successfully.');
        }
      } catch (error) {
        setSnackbarSeverity('error');
        setSnackbarMessage('Failed to change notification.');
      } finally {
        setLoading(false);
        setSnackbarOpen(true);
      }
    }
  };

  // Handle closing of the snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container sx={{ marginTop: 5 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Set Footer
      </Typography>
      <Grid container spacing={2}>
        <Grid container item xs={12} alignItems="center" spacing={2} sx={{ mb: 1 }}>
          <Grid xs={3}>Line1*</Grid>
          <Grid xs={9}>
            <ReactQuill
              value={title}
              onChange={setTitle}
              placeholder="Footer line 1"
              modules={{
                toolbar: [
                  ['bold', 'italic', 'underline', 'strike'],
                  [{ list: 'ordered' }, { list: 'bullet' }],
                  ['link'],
                  ['clean'],
                ],
              }}
            />
            {errors.title && (
              <Typography color="error" variant="caption">
                {errors.title}
              </Typography>
            )}
          </Grid>
        </Grid>
        <Grid container item xs={12} alignItems="center" spacing={2} sx={{ mb: 1 }}>
          <Grid xs={3}>Line2*</Grid>
          <Grid xs={9}>
            <CustomTextField
              fullWidth
              placeholder="Footer Line 2"
              type="content"
              variant="outlined"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              error={!!errors.content}
              helperText={errors.content}
              required
            />
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <CustomButton onClick={handleSubmit} variant="contained" fullWidth disabled={loading}>
            {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Submit'}
          </CustomButton>
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
