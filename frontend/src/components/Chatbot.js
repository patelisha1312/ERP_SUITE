import { useState } from 'react';

import axios from 'axios';

import { FaComments } from 'react-icons/fa';

import '../styles/Chatbot.css';

function Chatbot() {

  const [isOpen, setIsOpen] =
    useState(false);

  const [messages, setMessages] =
    useState([
      {
        text:
          'Hello 👋 Ask me about employees, inventory, income, or expense.',
        sender: 'bot'
      }
    ]);

  const [input, setInput] =
    useState('');

  // SEND MESSAGE

  const handleSend = async () => {

    if (!input.trim()) return;

    // USER MESSAGE

    const userMessage = {

      text: input,

      sender: 'user'

    };

    setMessages(prev => [

      ...prev,

      userMessage

    ]);

    try {

      // BACKEND API CALL

      const response =
        await axios.post(
          'http://localhost:5000/api/chatbot',
          {
            message: input
          }
        );

      // BOT MESSAGE

      const botMessage = {

        text: response.data.reply,

        sender: 'bot'

      };

      setMessages(prev => [

        ...prev,

        botMessage

      ]);

    } catch (error) {

      const errorMessage = {

        text:
          'Something went wrong.',

        sender: 'bot'

      };

      setMessages(prev => [

        ...prev,

        errorMessage

      ]);

    }

    setInput('');

  };

  return (

    <>

      {/* TOGGLE BUTTON */}

      <button
        className="chat-toggle-btn"
        onClick={() =>
          setIsOpen(!isOpen)
        }
      >

        <FaComments />

      </button>

      {/* CHAT WINDOW */}

      {

        isOpen && (

          <div className="chatbot-container">

            {/* HEADER */}

            <div className="chatbot-header">

              ERP AI Assistant

            </div>

            {/* MESSAGES */}

            <div className="chatbot-messages">

              {

                messages.map(
                  (msg, index) => (

                    <div
                      key={index}
                      className={

                        msg.sender === 'user'

                          ? 'chatbot-message user-message'

                          : 'chatbot-message'

                      }
                    >

                      {msg.text}

                    </div>

                  )
                )

              }

            </div>

            {/* INPUT AREA */}

            <div className="chatbot-input-area">

              <input
                type="text"
                placeholder="Ask something..."
                className="chatbot-input"
                value={input}
                onChange={(e) =>
                  setInput(e.target.value)
                }

                onKeyDown={(e) => {

                  if (e.key === 'Enter') {

                    handleSend();

                  }

                }}
              />

              <button
                onClick={handleSend}
                className="chatbot-button"
              >

                Send

              </button>

            </div>

          </div>

        )

      }

    </>

  );

}

export default Chatbot;