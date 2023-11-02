import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  render,
  Section,
  Text,
} from '@jsx-email/all';

type CodeEmailProps = {
  username: string;
  code: string;
};

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  marginBottom: '64px',
  padding: '20px 0 48px',
};

const box = {
  padding: '0 48px',
};

const paragraph = {
  color: '#777',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left' as const,
};

const codeStyles = {
  textAlign: 'center' as const,
  fontFamily: 'monospace',
  fontSize: '32px',
  marginTop: '16px',
  fontWeight: '500',
};

export function CodeEmail({ username, code }: CodeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        Hallo {username}, hier ist dein Login-Code: {code}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Text style={paragraph}>
              Hallo {username}, dein Login-Code lautet:
            </Text>
            <Text style={codeStyles}>{code}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export function createCodeEmailBody(props: CodeEmailProps) {
  const email = <CodeEmail {...props} />;
  return {
    html: render(email),
    text: render(email, { plainText: true }),
  };
}
