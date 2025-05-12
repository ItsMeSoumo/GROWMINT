import React from 'react';
import { Html, Body, Head, Heading, Hr, Container, Preview, Section, Text } from '@react-email/components';

export const ContactFormEmail = ({
  name,
  email,
  message,
}) => {
  return (
    <Html>
      <Head />
      <Preview>New Contact Form Message from GrowMint</Preview>
      <Body style={{
        backgroundColor: '#f6f9fc',
        fontFamily: 'Arial, sans-serif',
      }}>
        <Container style={{
          margin: '0 auto',
          padding: '20px 0',
          maxWidth: '600px',
        }}>
          <Section style={{
            backgroundColor: '#ffffff',
            padding: '30px',
            borderRadius: '5px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          }}>
            <Heading style={{
              color: '#4CAF50',
              fontSize: '24px',
              margin: '0 0 20px',
            }}>
              New Contact Form Submission
            </Heading>
            <Hr style={{
              borderColor: '#e6ebf1',
              margin: '20px 0',
            }} />
            <Text style={{
              fontSize: '16px',
              color: '#333',
              margin: '10px 0',
            }}>
              <strong>Name:</strong> {name}
            </Text>
            <Text style={{
              fontSize: '16px',
              color: '#333',
              margin: '10px 0',
            }}>
              <strong>Email:</strong> {email}
            </Text>
            <Text style={{
              fontSize: '16px',
              color: '#333',
              margin: '10px 0',
            }}>
              <strong>Message:</strong>
            </Text>
            <Text style={{
              fontSize: '16px',
              color: '#333',
              margin: '10px 0',
              padding: '15px',
              backgroundColor: '#f9f9f9',
              borderRadius: '4px',
            }}>
              {message}
            </Text>
            <Hr style={{
              borderColor: '#e6ebf1',
              margin: '20px 0',
            }} />
            <Text style={{
              fontSize: '14px',
              color: '#666',
              fontStyle: 'italic',
            }}>
              This email was sent from the GrowMint website contact form.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ContactFormEmail;