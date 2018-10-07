declare module '*.mp3' {
    import React from 'react';
    const content: React.ReactComponent<React.AudioHTMLAttributes<any>>;
    export default content;
}
