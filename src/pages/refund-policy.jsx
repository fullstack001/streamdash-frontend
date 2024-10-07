import React from 'react';

import { styled } from '@mui/material/styles';
import {
  Box,
  Link,
  List,
  Button,
  ListItem,
  Container,
  Typography,
  ListItemText,
  ListItemIcon,
} from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import Logo from 'src/components/logo';

const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(0.5, 0),
  '& .MuiListItemText-primary': {
    fontWeight: 'bold',
    fontSize: '1.1rem',
  },
}));

const DotIcon = () => (
  <Box
    component="span"
    sx={{
      width: 6,
      height: 6,
      borderRadius: '50%',
      backgroundColor: 'text.primary',
      display: 'inline-block',
      marginLeft: 2,
    }}
  />
);

export default function RefundPolicy() {
  const router = useRouter();

  const clickLogin = () => {
    router.push('/login');
  };

  return (
    <Container maxWidth="lg">
      <Box
        padding={2}
        sx={{
          display: 'flex',
          borderBottom: 'solid 1px #D9D9D9',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Logo />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#007bff',
              color: '#fff',
              borderRadius: 4,
              padding: '10px 20px',
            }}
            onClick={clickLogin}
          >
            Login
          </Button>
        </Box>
      </Box>
      <Box my={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          Terms of Use
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          <strong>Effective Date: 2024/10/01</strong>
        </Typography>
        <Typography paragraph>
          At Streamdash, we strive to provide the best possible experience for our users. This
          Refund Policy outlines the conditions under which refunds may or may not be issued for
          streaming credits purchased through our website,
          <Link href="http://www.streamdash.co" target="_blank" rel="noopener">
            http://www.streamdash.co
          </Link>
        </Typography>

        <Typography variant="h4" component="h2" gutterBottom>
          1. General Refund Policy
        </Typography>
        <Typography paragraph>
          All purchases of streaming credits on Streamdash are non-refundable once the credits have
          been used. This means that if you have utilized any portion of your streaming credits, you
          will not be eligible for a refund under any circumstances.
        </Typography>

        <Typography variant="h4" component="h2" gutterBottom>
          2. Refund Eligibility
        </Typography>
        <Typography paragraph>
          You may request a refund only if the following conditions are met:
        </Typography>
        <List>
          <StyledListItem>
            <ListItemIcon>
              <DotIcon />
            </ListItemIcon>
            <ListItemText primary="The streaming credits you purchased have not been used in any way." />
          </StyledListItem>
          <StyledListItem>
            <ListItemIcon>
              <DotIcon />
            </ListItemIcon>
            <ListItemText primary="The refund request is made within 7 days from the date of purchase." />
          </StyledListItem>
        </List>

        <Typography variant="h4" component="h2" gutterBottom>
          3. How to Request a Refund
        </Typography>
        <Typography paragraph>
          If you meet the criteria outlined above and wish to request a refund, please follow these
          steps:
        </Typography>
        <List>
          <StyledListItem>
            <ListItemIcon>1.</ListItemIcon>
            <ListItemText primary="Contact our support team at support@streamdash.co with your order details, including your account email and the transaction ID." />
          </StyledListItem>
          <StyledListItem>
            <ListItemIcon>2.</ListItemIcon>
            <ListItemText primary="Our team will review your request and respond within 1~3 business days" />
          </StyledListItem>
        </List>
        <Typography paragraph>
          If your refund request is approved, the refund will be processed through the original
          payment method used for the purchase. Please allow 5~6 business days for the refund to
          appear in your account.
        </Typography>

        <Typography variant="h4" component="h2" gutterBottom>
          4. Non-Refundable Circumstances
        </Typography>
        <Typography paragraph>
          We do not issue refunds under the following circumstances:
        </Typography>
        <List>
          <StyledListItem>
            <ListItemIcon>
              <DotIcon />
            </ListItemIcon>
            <ListItemText primary="Streaming credits have been partially or fully used." />
          </StyledListItem>
          <StyledListItem>
            <ListItemIcon>
              <DotIcon />
            </ListItemIcon>
            <ListItemText primary="Requests made after 4 days from the date of purchase." />
          </StyledListItem>
          <StyledListItem>
            <ListItemIcon>
              <DotIcon />
            </ListItemIcon>
            <ListItemText primary="Issues related to third-party service interruptions or internet connectivity problems." />
          </StyledListItem>
          <StyledListItem>
            <ListItemIcon>
              <DotIcon />
            </ListItemIcon>
            <ListItemText primary="Change of mind after purchasing streaming credits." />
          </StyledListItem>
        </List>
        <Typography variant="h4" component="h2" gutterBottom>
          5. Disputes and Chargebacks
        </Typography>
        <Typography paragraph>
          If you have any concerns about your purchase, we encourage you to contact us directly at
          support@streamdash.co. We will work with you to resolve any issues. Please note that
          filing a chargeback without first contacting us may result in the termination of your
          account.
        </Typography>

        <Typography variant="h4" component="h2" gutterBottom>
          6. Contact Us
        </Typography>
        <Typography paragraph>
          If you have any questions or concerns about this Refund Policy, please contact us at:
        </Typography>
        <Typography paragraph paddingBottom={4}>
          Streamdash
          <br />
          Email: <Link href="mailto:support@streamdash.co">support@streamdash.co</Link>
        </Typography>
      </Box>
    </Container>
  );
}
