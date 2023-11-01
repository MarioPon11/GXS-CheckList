import React, { useState, useEffect } from 'react';

interface BulletTextAreaProps {
  existingData?: string[];
  updateParent?: (index: number, newValue: string) => void;
  index?: number;
}

const BulletTextArea: React.FC<BulletTextAreaProps> = ({ existingData, updateParent, index }) => {
  const [text, setText] = useState<string>('');

  useEffect(() => {
    if (existingData && existingData.length > 0) {
      const populatedText = existingData.map(item => `- ${item}`).join('\n');
      setText(populatedText);
    }
  }, []); // Empty dependency array

  useEffect(() => {
    if (updateParent && index !== undefined) {
      updateParent(index, text);
    }
  }, [text, updateParent, index]);



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
      placeholder='List'
      rows={10}
      cols={50}
    />
  );
};

export default BulletTextArea;
