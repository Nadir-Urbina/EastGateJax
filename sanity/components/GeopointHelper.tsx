import React from 'react';

export function GeopointHelper(props: any) {
  // Pass through the input component
  const {renderDefault} = props;
  
  return (
    <div>
      {renderDefault(props)}
      <div style={{ 
        marginTop: '10px', 
        padding: '12px', 
        background: '#f5f8fa', 
        borderRadius: '4px',
        fontSize: '14px',
        lineHeight: '1.5'
      }}>
        <h3 style={{ margin: '0 0 8px 0', fontWeight: 600 }}>Tips for using the map:</h3>
        <ol style={{ margin: 0, paddingLeft: '16px' }}>
          <li style={{ marginBottom: '4px' }}>
            <strong>Search for an address</strong> using the search box
          </li>
          <li style={{ marginBottom: '4px' }}>
            <strong>Click on the map</strong> to set the location pin
          </li>
          <li style={{ marginBottom: '4px' }}>
            <strong>Drag the pin</strong> to fine-tune the location
          </li>
        </ol>
        <p style={{ margin: '8px 0 0 0', color: '#666' }}>
          The coordinates will be automatically saved and used to display the group's location on the website map.
        </p>
      </div>
    </div>
  );
}

export default GeopointHelper; 