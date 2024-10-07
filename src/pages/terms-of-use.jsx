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

export default function TermsOfUse() {
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
          Welcome to Streamdash! By accessing or using our website,
          <Link href="http://www.streamdash.co" target="_blank" rel="noopener">
            http://www.streamdash.co
          </Link>
          , you agree to be bound by these Terms of Use. If you do not agree to these Terms, please
          do not use the Site.
        </Typography>

        <Typography variant="h4" component="h2" gutterBottom>
          1. Acceptance of Terms
        </Typography>
        <Typography paragraph>
          By using the Site, you agree to comply with and be legally bound by the terms and
          conditions of these Terms of Use, whether or not you become a registered user of the
          services offered on the Site. These Terms govern your access to and use of the Site and
          services provided by Streamdash.
        </Typography>

        <Typography variant="h4" component="h2" gutterBottom>
          2. Modification of Terms
        </Typography>
        <Typography paragraph>
          Streamdash reserves the right to modify or replace these Terms at any time. The most
          current version will be posted on the Site, and your continued use of the Site after such
          changes are made constitutes your acceptance of the new Terms.
        </Typography>

        <Typography variant="h4" component="h2" gutterBottom>
          3. Use of the Site
        </Typography>
        <Typography paragraph>
          You may use the Site and its content solely for lawful purposes and in accordance with
          these Terms. Specifically:
        </Typography>
        <List>
          <StyledListItem>
            <ListItemIcon>
              <DotIcon />
            </ListItemIcon>
            <ListItemText primary="You agree not to use the Site in any way that violates any applicable federal, state, local, or international law or regulation." />
          </StyledListItem>
          <StyledListItem>
            <ListItemIcon>
              <DotIcon />
            </ListItemIcon>
            <ListItemText primary="You agree not to attempt to gain unauthorized access to the Site, or to other accounts, computer systems, or networks connected to the Site." />
          </StyledListItem>
          <StyledListItem>
            <ListItemIcon>
              <DotIcon />
            </ListItemIcon>
            <ListItemText primary="You agree not to interfere or attempt to interfere with the proper working of the Site or any activities conducted on the Site." />
          </StyledListItem>
        </List>

        <Typography variant="h4" component="h2" gutterBottom>
          4. User Accounts and Registration
        </Typography>
        <Typography paragraph>
          In order to access certain features of the Site, you may be required to create an account.
          You are responsible for maintaining the confidentiality of your account credentials and
          for all activities that occur under your account. You agree to notify us immediately of
          any unauthorized use or breach of your account security.
        </Typography>
        <Typography paragraph>
          Streamdash reserves the right to terminate or suspend your account at any time for
          violations of these Terms or for any other reason deemed necessary to protect the
          integrity of the Site and its users.
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          5. Intellectual Property
        </Typography>
        <Typography paragraph>
          All content, features, and functionality of the Site, including but not limited to text,
          graphics, logos, images, software, and audio (collectively, the “Content”), are the
          exclusive property of Streamdash and are protected by copyright, trademark, patent, trade
          secret, and other intellectual property or proprietary rights laws.
        </Typography>
        <Typography paragraph>
          You may not copy, modify, distribute, transmit, reproduce, publish, or create derivative
          works from any Content on the Site without prior written permission from Streamdash.
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          6. User-Generated Content
        </Typography>
        <Typography paragraph>
          You may have the opportunity to post, upload, or submit content to the Site (“User
          Content”). By doing so, you grant Streamdash a worldwide, non-exclusive, royalty-free,
          transferable license to use, display, reproduce, distribute, and modify your User Content
          for the purposes of operating the Site and providing services.
        </Typography>
        <Typography paragraph>
          You are solely responsible for the content you submit and must ensure that such content
          does not violate any third-party rights or any applicable laws.
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          7. Limitation of Liability
        </Typography>
        <Typography paragraph>
          To the fullest extent permitted by applicable law, Streamdash, its owners, directors,
          employees, affiliates, agents, and licensors are not liable for any indirect, incidental,
          special, consequential, or punitive damages, including but not limited to loss of profits,
          data, or other intangible losses, arising from:
        </Typography>
        <List>
          <StyledListItem>
            <ListItemIcon>
              <DotIcon />
            </ListItemIcon>
            <ListItemText primary="Your use of the Site or inability to use the Site;" />
          </StyledListItem>
          <StyledListItem>
            <ListItemIcon>
              <DotIcon />
            </ListItemIcon>
            <ListItemText primary="Any unauthorized access to or use of our servers and/or any personal information stored on them;" />
          </StyledListItem>
          <StyledListItem>
            <ListItemIcon>
              <DotIcon />
            </ListItemIcon>
            <ListItemText primary="Any bugs, viruses, or harmful components transmitted through the Site by any third party;" />
          </StyledListItem>
          <StyledListItem>
            <ListItemIcon>
              <DotIcon />
            </ListItemIcon>
            <ListItemText primary="Any content or conduct of any third party on the Site." />
          </StyledListItem>
        </List>
        <Typography paragraph>
          In no event shall Streamdash’s total liability to you exceed the amount you have paid, if
          any, to access the Site in the past 12 months.
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          8. Indemnification
        </Typography>
        <Typography paragraph>
          You agree to indemnify and hold harmless Streamdash, its owners, officers, directors,
          employees, and agents from and against any and all claims, liabilities, damages, losses,
          or expenses (including legal fees) arising out of your use of the Site, your breach of
          these Terms, or your violation of any third-party rights.
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          9. Third-Party Links and Services
        </Typography>
        <Typography paragraph>
          The Site may contain links to third-party websites or services that are not owned or
          controlled by Streamdash. We are not responsible for the content, privacy policies, or
          practices of any third-party websites. You acknowledge and agree that Streamdash is not
          liable for any damage or loss caused by or in connection with your use of any third-party
          websites or services.
        </Typography>

        <Typography variant="h4" component="h2" gutterBottom>
          10. Termination
        </Typography>
        <Typography paragraph>
          We reserve the right, in our sole discretion, to terminate your access to all or part of
          the Site at any time, for any reason, including without limitation any violation of these
          Terms, without prior notice or liability.
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          11. Disclaimer of Warranties
        </Typography>
        <Typography paragraph>
          The Site and its content are provided “as is” and “as available” without warranties of any
          kind, either express or implied, including, but not limited to, implied warranties of
          merchantability, fitness for a particular purpose, and non-infringement. Streamdash does
          not warrant that the Site will be uninterrupted, secure, or error-free, or that any
          defects will be corrected.
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          12. Governing Law
        </Typography>
        <Typography paragraph>
          These Terms are governed by and construed in accordance with the laws of [Insert Your
          State/Country]. You agree that any legal action or dispute arising from your use of the
          Site shall be brought exclusively in the courts located in [Insert Location].
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          13. Severability
        </Typography>
        <Typography paragraph>
          If any provision of these Terms is deemed unlawful, void, or unenforceable for any reason,
          that provision shall be deemed severable and shall not affect the validity and
          enforceability of the remaining provisions.
        </Typography>

        <Typography variant="h4" component="h2" gutterBottom>
          14. Contact Information
        </Typography>
        <Typography paragraph>
          If you have any questions or concerns about these Terms, please contact us at:
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
