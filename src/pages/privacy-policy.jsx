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

export default function PrivacyPolicy() {
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
          Privacy Policy
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          <strong>Effective Date: 2024/10/01</strong>
        </Typography>
        <Typography paragraph>
          At Streamdash, we value your privacy and are committed to protecting your personal
          information. This Privacy Policy explains how we collect, use, disclose, and safeguard
          your information when you visit our website{' '}
          <Link href="http://www.streamdash.co" target="_blank" rel="noopener">
            http://www.streamdash.co
          </Link>
          .
        </Typography>
        <Typography paragraph>
          By accessing or using the Site, you consent to the data practices described in this
          policy. If you do not agree with the terms of this Privacy Policy, please do not access or
          use the Site.
        </Typography>

        <Typography variant="h4" component="h2" gutterBottom>
          1. Information We Collect
        </Typography>
        <Typography paragraph>
          We collect both Personal Information and Non-Personal Information to provide and improve
          our services.
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom>
          Personal Information
        </Typography>
        <Typography paragraph>
          This refers to any data that can be used to identify you personally. It may include:
        </Typography>
        <List>
          <StyledListItem>
            <ListItemIcon>
              <DotIcon />
            </ListItemIcon>
            <ListItemText primary="Contact Information: Name, email address, phone number, etc." />
          </StyledListItem>
          <StyledListItem>
            <ListItemIcon>
              <DotIcon />
            </ListItemIcon>
            <ListItemText primary="Account Information: If you create an account, we collect your login details (username and password)." />
          </StyledListItem>
          <StyledListItem>
            <ListItemIcon>
              <DotIcon />
            </ListItemIcon>
            <ListItemText primary="Payment Information: Credit card or payment details when you purchase services on the Site." />
          </StyledListItem>
          <StyledListItem>
            <ListItemIcon>
              <DotIcon />
            </ListItemIcon>
            <ListItemText primary="Device Information: Your IP address, browser type, operating system, and device type." />
          </StyledListItem>
        </List>

        <Typography variant="h5" component="h3" gutterBottom>
          Non-Personal Information
        </Typography>
        <Typography paragraph>
          This includes aggregated data that cannot be used to identify you personally, such as:
        </Typography>
        <List>
          <StyledListItem>
            <ListItemText primary="Usage data about how you interact with the Site." />
          </StyledListItem>
          <StyledListItem>
            <ListItemText primary="Information collected through cookies or tracking technologies (see Section 5)." />
          </StyledListItem>
        </List>

        <Typography variant="h4" component="h2" gutterBottom>
          2. How We Use Your Information
        </Typography>
        <Typography paragraph>
          We use your information for a variety of purposes, including:
        </Typography>
        <List>
          <StyledListItem>
            <ListItemIcon>
              <DotIcon />
            </ListItemIcon>
            <ListItemText primary="To operate and maintain the Site." />
          </StyledListItem>
          <StyledListItem>
            <ListItemIcon>
              <DotIcon />
            </ListItemIcon>
            <ListItemText primary="To process payments and manage transactions." />
          </StyledListItem>
          <StyledListItem>
            <ListItemIcon>
              <DotIcon />
            </ListItemIcon>
            <ListItemText primary="To respond to inquiries, customer service requests, or support needs." />
          </StyledListItem>
          <StyledListItem>
            <ListItemIcon>
              <DotIcon />
            </ListItemIcon>
            <ListItemText primary="To send updates, promotional materials, or other information related to your use of the Site." />
          </StyledListItem>
          <StyledListItem>
            <ListItemIcon>
              <DotIcon />
            </ListItemIcon>
            <ListItemText primary="To improve and personalize your experience on the Site through analytics and user feedback." />
          </StyledListItem>
          <StyledListItem>
            <ListItemIcon>
              <DotIcon />
            </ListItemIcon>
            <ListItemText primary="To comply with legal requirements or respond to legal requests." />
          </StyledListItem>
        </List>

        <Typography variant="h4" component="h2" gutterBottom>
          3. Disclosure of Your Information
        </Typography>
        <Typography paragraph>
          We may share your information with third parties in the following cases:
        </Typography>
        <List>
          <StyledListItem>
            <ListItemIcon>
              <DotIcon />
            </ListItemIcon>
            <ListItemText primary="Service Providers: We may share your information with third-party vendors, contractors, or partners who perform services on our behalf, such as payment processing or hosting services." />
          </StyledListItem>
          <StyledListItem>
            <ListItemIcon>
              <DotIcon />
            </ListItemIcon>
            <ListItemText primary="Legal Compliance: We may disclose your information if required to do so by law, or in response to valid legal requests from authorities (e.g., in compliance with a subpoena or court order)." />
          </StyledListItem>
          <StyledListItem>
            <ListItemIcon>
              <DotIcon />
            </ListItemIcon>
            <ListItemText primary="Business Transfers: In the event of a merger, acquisition, or sale of all or part of our assets, your personal information may be transferred to the acquiring entity." />
          </StyledListItem>
        </List>

        <Typography variant="h4" component="h2" gutterBottom>
          4. Security of Your Information
        </Typography>
        <Typography paragraph>
          We use administrative, technical, and physical security measures to protect your personal
          information. However, no method of transmission over the Internet or electronic storage is
          completely secure. While we strive to protect your personal information, we cannot
          guarantee its absolute security.
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          5. Cookies and Tracking Technologies
        </Typography>
        <Typography paragraph>
          We use cookies and similar tracking technologies to collect and store information when you
          visit our Site. Cookies are small text files placed on your device to track usage
          patterns, preferences, and activity on the Site. You may refuse to accept cookies by
          adjusting your browser settings, but doing so may limit your ability to use certain
          features of the Site.
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          6. Third-Party Links
        </Typography>
        <Typography paragraph>
          Our Site may contain links to third-party websites or services that are not operated by
          us. This Privacy Policy does not apply to those third-party websites, and we are not
          responsible for their content, privacy policies, or practices. We encourage you to review
          their privacy policies before sharing your information with them.
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          7. Children&lsquo;s Privacy
        </Typography>
        <Typography paragraph>
          Our Site is not directed at individuals under the age of 13, and we do not knowingly
          collect personal information from children under 13. If we become aware that we have
          collected personal data from a child under 13, we will take steps to delete such
          information from our servers.
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          8. Data Retention
        </Typography>
        <Typography paragraph>
          We will retain your personal information only for as long as necessary to fulfill the
          purposes outlined in this Privacy Policy or as required by law. Once the information is no
          longer needed, we will securely delete or anonymize it.
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          9. Your Data Rights
        </Typography>
        <Typography paragraph>
          Depending on your location, you may have certain rights related to your personal
          information. These may include:
        </Typography>
        <List>
          <StyledListItem>
            <ListItemIcon>
              <DotIcon />
            </ListItemIcon>
            <ListItemText primary="Access: Request access to the personal data we have collected about you." />
          </StyledListItem>
          <StyledListItem>
            <ListItemIcon>
              <DotIcon />
            </ListItemIcon>
            <ListItemText primary="Correction: Request the correction of any inaccurate or incomplete data." />
          </StyledListItem>
          <StyledListItem>
            <ListItemIcon>
              <DotIcon />
            </ListItemIcon>
            <ListItemText primary="Deletion: Request the deletion of your personal data, subject to certain exceptions." />
          </StyledListItem>
          <StyledListItem>
            <ListItemIcon>
              <DotIcon />
            </ListItemIcon>
            <ListItemText primary="Objection: Object to the processing of your data for certain purposes, including marketing." />
          </StyledListItem>
          <StyledListItem>
            <ListItemIcon>
              <DotIcon />
            </ListItemIcon>
            <ListItemText primary="Data Portability: Request the transfer of your personal data to another service provider." />
          </StyledListItem>
        </List>
        <Typography variant="h4" component="h2" gutterBottom>
          10. Changes to This Privacy Policy
        </Typography>
        <Typography paragraph>
          We reserve the right to update or modify this Privacy Policy at any time. Any changes will
          be posted on this page with the updated effective date. Your continued use of the Site
          following the posting of changes constitutes your acceptance of those changes.
        </Typography>

        <Typography variant="h4" component="h2" gutterBottom>
          11. Contact Us
        </Typography>
        <Typography paragraph>
          If you have any questions or concerns about this Privacy Policy or our data practices,
          please contact us at:
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
