import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error boundary component to catch and display Sanity Studio errors
 */
export class SanityErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Sanity Studio error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const errorMessage = this.state.error?.message || 'Unknown error';
      
      // Check for common Sanity errors and provide helpful messages
      let helpfulMessage = '';
      
      if (errorMessage.includes('WebSocket') || errorMessage.includes('socket')) {
        helpfulMessage = 'There appears to be a connection issue with Sanity. This might be due to network problems or Sanity service interruptions.';
      } else if (errorMessage.includes('Unsupported image type')) {
        helpfulMessage = 'The image format you tried to upload is not supported. Please use JPG, PNG, WebP, or GIF formats.';
      } else if (errorMessage.includes('cannot be a descendant of') || errorMessage.includes('cannot contain a nested')) {
        helpfulMessage = 'There is an HTML structure issue in one of your content fields. This is likely related to blockquote formatting.';
      }

      return (
        <div className="p-8 max-w-xl mx-auto">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-6">
            <h2 className="text-lg font-semibold text-red-700 mb-2">Sanity Studio Error</h2>
            <p className="text-red-600 text-sm mb-2">{errorMessage}</p>
            {helpfulMessage && (
              <p className="text-gray-700 text-sm">{helpfulMessage}</p>
            )}
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium">Try these troubleshooting steps:</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>Refresh the page</li>
              <li>Check your internet connection</li>
              <li>Clear your browser cache</li>
              <li>Try a different browser</li>
              <li>Contact your administrator if the problem persists</li>
            </ul>
            
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
} 