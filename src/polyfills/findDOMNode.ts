import ReactDOM from 'react-dom';

// Comprehensive polyfill for Base UI compatibility with React 18
// Base UI uses deprecated APIs that were removed in React 18

// Type assertion to allow accessing deprecated methods
const ReactDOMWithLegacyAPIs = ReactDOM as any;

// Polyfill findDOMNode
if (!ReactDOMWithLegacyAPIs.findDOMNode) {
  ReactDOMWithLegacyAPIs.findDOMNode = (instance: any) => {
    if (instance == null) {
      return null;
    }
    
    // If it's already a DOM node, return it
    if (instance.nodeType === 1) {
      return instance;
    }
    
    // For React components, try to get the DOM node from fiber
    if (instance._reactInternals) {
      return instance._reactInternals.stateNode || null;
    }
    
    // Fallback for class components
    if (instance.refs && instance.refs.input) {
      return instance.refs.input;
    }
    
    return null;
  };
}

// Add additional DOM node helper
if (typeof window !== 'undefined') {
  // Patch to prevent "selectionStart in null" errors
  const originalGetSelection = window.getSelection;
  if (originalGetSelection) {
    window.getSelection = function() {
      try {
        return originalGetSelection.call(this);
      } catch (e) {
        return null as any;
      }
    };
  }
}

export {};