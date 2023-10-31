import React, { useState, useEffect } from 'react';

interface BulletTextAreaProps {
  existingData?: string[];
}

const BulletTextArea: React.FC<BulletTextAreaProps> = ({ existingData }) => {
  const [text, setText] = useState<string>('');

  useEffect(() => {
    if (existingData && existingData.length > 0) {
      const populatedText = existingData.map(item => `- ${item}`).join('\n');
      setText(populatedText);
    }
  }, [existingData]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setText((prevText) => `${prevText}\n- `);
    }
  };

  return (
    <textarea
      className='tab-data'
      value={text}
      onChange={(e) => setText(e.target.value)}
      onKeyDown={handleKeyDown}
      rows={10}
      cols={50}
    />
  );
};

export default BulletTextArea;
