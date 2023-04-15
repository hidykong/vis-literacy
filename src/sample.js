import React from 'react';
import ChatBot from 'react-simple-chatbot';
import  Graph from './graph.html'
export const Sample = () => {
  return (
    <ChatBot
      steps={[
        {
          id: '1',
          message: 'What is your name?',
          trigger: '2',
        },
        {
          id: '2',
          user: true,
          trigger: '3',
        },
        {
          id: '3',
          message: 'Hi {previousValue}, nice to meet you!',
          trigger: '4',
        },
        {
          id: '4',
          user: true,
          trigger: '5',
        },
        {
          id: '5',
          component:
          (
              <div>
                <p>Here's an example image:</p>
                <Graph />
              </div>
            ),
          end: true,
        },
      ]}
    />
  );
};
export default Sample;