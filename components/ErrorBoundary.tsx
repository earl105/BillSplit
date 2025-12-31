import React from 'react';

interface State {
  error: Error | null;
}

class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, State> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: any) {
    // Log to console; in production you'd send to a logging endpoint
    // Keep this visible so the dev console shows it
    // eslint-disable-next-line no-console
    console.error('Uncaught error in React tree:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{padding: 24, fontFamily: 'Inter, system-ui, Arial, sans-serif'}}>
          <h2 style={{color: '#b91c1c'}}>Application error</h2>
          <p style={{color: '#374151'}}>An error occurred while rendering the app.</p>
          <pre style={{whiteSpace: 'pre-wrap', background: '#fff', padding: 12, borderRadius: 8, color: '#111'}}>
            {this.state.error?.stack || this.state.error?.message}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
