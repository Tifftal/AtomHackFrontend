import React, { useEffect, useState } from 'react';
import { Props } from './types';

const TruncateText: React.FC<Props> = ({ text, maxLength }) => {
    const [truncatedText, setTruncatedText] = useState<string>(text);

    useEffect(() => {
        if (text.length > maxLength) {
            const truncated = `${text.substring(0, maxLength / 2)}...${text.substring(text.length - maxLength / 2)}`;
            setTruncatedText(truncated);
        }
    }, [text, maxLength]);

    return (
        <p>
            {truncatedText}
        </p>
    );
};

export default TruncateText;
